/**
 * 
 * @param {import("./connectDB")} conn 
 * @param {number[]} gids 
 */
const queryPersonal = async (conn, gids) => {
	const result = await conn.query(
		'SELECT * FROM gallery_personal WHERE gid IN (?)', [gids]
	);

	return result.reduce((o, r) => {
		o[r.gid] = r;
		return o;
	}, {});
};

module.exports = queryPersonal;