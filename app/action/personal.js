const ConnectDB = require('../util/connectDB');
const getResponse = require('../util/getResponse');

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
const personal = async (req, res) => {
	const {gid, type, value} = Object.assign({}, req.body);

	const conn = await new ConnectDB().connect();
	try {
		const cols = ['gid', type.toLowerCase()];
		const paramStr = Array(cols.length).fill('?').join(',');
		const result = await conn.query(
			`INSERT INTO gallery_personal (${cols.join(',')}) VALUES (${paramStr})
			ON DUPLICATE KEY UPDATE ${cols.map(c => `${c}=VALUES(${c})`).join(',')}`,
			[gid, value]
		);
		return res.json(getResponse(result, 200, 'success', {}));
	} finally {
		conn.end();
	}
};

module.exports = personal;