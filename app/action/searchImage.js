const phash = require("sharp-phash");
const ConnectDB = require('../util/connectDB');
const getResponse = require('../util/getResponse');
const queryTags = require("../util/queryTags");
const queryTorrents = require("../util/queryTorrents");

const searchImage = async (req, res) => {
	if (!req.file) {
		return res.status(400).send('No file uploaded.');
	}

	const { out = '' } = Object.assign({}, req.params, req.query);

	const conn = await new ConnectDB().connect();

	const ph = await phash(req.file.buffer);
	const phints = ph.match(/.{1,16}/g).map(i => parseInt(i, 2));
	const bitcount = ph.split('1').length - 1;
	const hammdist = 9;

	const galFields = (out === 'gid' ? 'g.gid' : 'g.*');

	const result = await conn.query(
		`WITH phash AS (
			select thumb,
				bit_count(? ^ ph0) + bit_count(? ^ ph1) +
				bit_count(? ^ ph2) + bit_count(? ^ ph3) as bc
			from gallery_thumb_hash where bitcount between ? and ?
		)
		SELECT bc, ${galFields} FROM gallery g
		INNER JOIN phash h ON g.thumb=h.thumb
		WHERE bc <= ? ORDER BY bc, posted;`,
		phints.concat([bitcount - hammdist, bitcount + hammdist, hammdist])
	);

	if (out !== 'gid') {
		const gids = result.map(e => e.gid);
		const rootGids = result.map(e => e.root_gid).filter(e => e);
		const gidTags = await queryTags(conn, gids);
		const gidTorrents = await queryTorrents(conn, rootGids);

		result.forEach(e => {
			e.tags = gidTags[e.gid] || [];
			e.torrents = gidTorrents[e.root_gid] || [];
		});
	}

	return res.json(getResponse(result, 200, 'success', { total: result.length }));
};

module.exports = searchImage;
