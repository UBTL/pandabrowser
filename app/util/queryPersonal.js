const config = require("../../config");

/**
 * 
 * @param {import("./connectDB")} conn 
 * @param {number[]} gids 
 */
const queryPersonal = async (conn, gids) => {
	const result = await conn.query(
		'SELECT * FROM gallery_personal WHERE gid IN (?)', [gids]
	);

	// TODO: it'd be nice if datatype handling was all in connectDB
	const boolCols = ['have', 'done', 'want'];
	return result.reduce((o, r) => {
		if (config.dbType == 'sqlite') {
			r = Object.keys(r).reduce((o,c) => {
				o[c] = boolCols.includes(c) ? !!r[c] : r[c];
				return o;
			}, {});
		}
		o[r.gid] = r;
		return o;
	}, {});
};

module.exports = queryPersonal;