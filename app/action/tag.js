const config = require('../../config');
const ConnectDB = require('../util/connectDB');
const getResponse = require('../util/getResponse');
const normalizedTag = require('../util/normalizedTag');
const { populateGalleryData } = require('../util/queryCommon');

const tagList = async (req, res) => {
	let { tag, page = 1, limit = 10 } = Object.assign({}, req.params, req.query);
	[page, limit] = [page, limit].map(e => {
		if (e <= 0) {
			return 1;
		}
		return parseInt(e, 10);
	});
	if (limit > 25) {
		return res.json(getResponse(null, 400, 'limit is too large'));
	}

	const tags = tag.split(/\s*,\s*/).filter(e => e).map(normalizedTag);
	if (!tags.length) {
		return res.json(getResponse(null, 400, 'tag is not defined'));
	}

	const conn = await new ConnectDB().connect();
	try {
		const thumbQuery = '(select thumb from thumbnail where id=a.thumbnail_id) thumb';
		const indexClause = config.dbType == 'sqlite' ? '' : 'FORCE INDEX(posted)';
		const result = await conn.query(
			`SELECT a.*, ${thumbQuery} FROM gallery AS a ${indexClause} INNER JOIN (
				SELECT a.* FROM gid_tid AS a INNER JOIN (
					SELECT id FROM tag WHERE name IN (?)
				) AS b ON a.tid = b.id GROUP BY a.gid HAVING COUNT(a.gid) = ? ORDER BY NULL
			) AS b ON a.gid = b.gid WHERE expunged = 0 ORDER BY posted DESC LIMIT ? OFFSET ?`,
			[tags, tags.length, limit, (page - 1) * limit]
		);
		const { total } = (await conn.query(
			`SELECT COUNT(*) AS total FROM gallery AS a INNER JOIN (
				SELECT a.* FROM gid_tid AS a INNER JOIN(
					SELECT id FROM tag WHERE name IN(?)
				) AS b ON a.tid = b.id GROUP BY a.gid HAVING COUNT(a.gid) = ? ORDER BY NULL
			) AS b ON a.gid = b.gid WHERE expunged = 0`,
			[tags, tags.length]
		))[0];

		if (!result.length) {
			return res.json(getResponse([], 200, 'success', { total }));
		}

		await populateGalleryData(conn, result);

		return res.json(getResponse(result, 200, 'success', { total }));
	} catch (err) {
		return res.status(500).json(getResponse(null, 500, 'internal server error', { err }));
	} finally {
		conn.end();
	}
};

module.exports = tagList;