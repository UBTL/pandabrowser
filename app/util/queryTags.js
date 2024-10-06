/**
 * @typedef {{ [key: string]: string[] }} TagMap
 */

/**
 * 
 * @param {import("./connectDB")} conn 
 * @param {number[]} gids 
 * @returns {Promise<TagMap>}
 */
const queryTags = async (conn, gids) => {
	/** @type {TagMap} */
	const gidTags = {};
	if (!gids || !gids.length) {
		return gidTags;
	}
	const tagResult = await conn.query(
		'SELECT a.gid, b.name FROM gid_tid AS a INNER JOIN tag AS b ON a.tid = b.id WHERE a.gid IN (?)', [gids]
	);
	tagResult.forEach(({ gid, name }) => {
		if (!gidTags[gid]) {
			gidTags[gid] = [];
		}
		gidTags[gid].push(name);
	});
	return gidTags;
};

module.exports = queryTags;