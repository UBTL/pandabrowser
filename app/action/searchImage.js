const phash = require("sharp-phash");
const ConnectDB = require('../util/connectDB');
const getResponse = require('../util/getResponse');
const queryTags = require("../util/queryTags");
const queryTorrents = require("../util/queryTorrents");
const config = require("../../config");

const searchImage = async (req, res) => {
	if (!req.file) {
		return res.status(400).send('No file uploaded.');
	}

	const { out = '' } = Object.assign({}, req.params, req.query);

	const ph = await phash(req.file.buffer);
	const phints = ph.match(/.{1,16}/g).map(i => parseInt(i, 2));
	const bitcount = ph.split('1').length - 1;
	const hammdist = 9;

	const conn = await new ConnectDB().connect();
	try {
		const galFields = (out === 'gid' ? 'g.gid' : 'g.*');

		const bcxorClause = (col) => (
			config.dbType == 'sqlite'
			? `bit_count(xor(?, ph${col}))`
			: `bit_count(? ^ ph${col})`
		);
		const sql = `WITH phash AS (
				select id, thumb, ${[0,1,2,3].map(bcxorClause).join(' + ')} as bc
				from thumbnail where bitcount between ? and ?
			)
			SELECT ${galFields}, thumb, bc FROM gallery g
			INNER JOIN phash h ON g.thumbnail_id=h.id
			WHERE bc <= ? ORDER BY bc, posted`;

		const result = await conn.query(
			sql,
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
	} finally {
		conn.end();
	}
};

module.exports = searchImage;
