const ConnectDB = require('../util/connectDB');
const getResponse = require('../util/getResponse');
const { upsertClause } = require('../util/queryCommon');

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
const personal = async (req, res) => {
	const knownCols = ['gid', 'have', 'done', 'want', 'rating', 'note'];
	const cols = knownCols.filter(c => req.body[c] != null);

	const conn = await new ConnectDB().connect();
	try {
		const paramStr = Array(cols.length).fill('?').join(',');
		const result = await conn.query(
			`INSERT INTO gallery_personal (${cols.join(',')})
				VALUES (${paramStr})
				${upsertClause(cols, 'gid')}`,
			cols.map(c => req.body[c])
		);
		return res.json(getResponse(result, 200, 'success', {}));
	} finally {
		conn.end();
	}
};

module.exports = personal;