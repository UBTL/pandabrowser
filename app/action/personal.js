const config = require('../../config');
const ConnectDB = require('../util/connectDB');
const getResponse = require('../util/getResponse');


const upsertColumns = (cols) => 
	config.dbType == 'sqlite'
	? cols.map(c => `${c}=excluded.${c}`).join(',')
	: cols.map(c => `${c}=VALUES(${c})`).join(',')

const upsertClause = (cols) => (
	config.dbType == 'sqlite'
		? 'ON CONFLICT (gid) DO UPDATE SET '
		: 'ON DUPLICATE KEY UPDATE '
	) + upsertColumns(cols)

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
				${upsertClause(cols)}`,
			cols.map(c => req.body[c])
		);
		return res.json(getResponse(result, 200, 'success', {}));
	} finally {
		conn.end();
	}
};

module.exports = personal;