const ConnectDB = require('../util/connectDB');
const getResponse = require('../util/getResponse');
const queryTags = require('../util/queryTags');
const queryTorrents = require('../util/queryTorrents');

const gallery = async (req, res) => {
	const { gid = '', token = '' } = Object.assign({}, req.params, req.query);
	if (!/^\d+$/.test(gid) || !/^[0-9a-f]{10}$/.test(token)) {
		return res.json(getResponse(null, 400, 'gid or token is invalid'));
	}

	const conn = await new ConnectDB().connect();
	try {
		const sql = `SELECT *,
				(select thumb from thumbnail where id=gallery.thumbnail_id) thumb
			FROM gallery WHERE gid = ? AND token = ?`;
		const result = (await conn.query(sql, [gid, token]))[0];
		if (!result) {
			return res.json(getResponse(null, 404, 'no gallery matches gid and token'));
		}

		const { root_gid } = result;
		const tags = (await queryTags(conn, [gid]))[gid] || [];
		let torrents = [];
		if (result.root_gid) {
			torrents = (await queryTorrents(conn, [root_gid]))[root_gid] || [];
		}

		return res.json(getResponse(
			{ ...result, tags, torrents },
			200,
			'success'
		));
	} catch (err) {
		return res.status(500).json(getResponse(null, 500, 'internal server error', { err }));
	} finally {
		conn.end();
	}
};

module.exports = gallery;