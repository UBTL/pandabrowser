const config = require('../../config');
const queryPersonal = require('./queryPersonal');
const queryTags = require('./queryTags');
const queryTorrents = require('./queryTorrents');


const upsertColumns = (cols) => 
	config.dbType == 'sqlite'
	? cols.map(c => `${c}=excluded.${c}`).join(',')
	: cols.map(c => `${c}=VALUES(${c})`).join(',');


const upsertClause = (cols, conflicCol) => (
	config.dbType == 'sqlite'
		? `ON CONFLICT (${conflicCol}) DO UPDATE SET `
		: 'ON DUPLICATE KEY UPDATE '
	) + upsertColumns(cols);


const populateGalleryData = async (conn, result) => {
	const gids = result.map(e => e.gid);
	const rootGids = result.map(e => e.root_gid).filter(e => e);
	const gidTags = await queryTags(conn, gids);
	const gidTorrents = await queryTorrents(conn, rootGids);
	const personal = config.features.personal && await queryPersonal(conn, gids);

	result.forEach(e => {
		e.tags = gidTags[e.gid] || [];
		e.torrents = gidTorrents[e.root_gid] || [];
		e.personal = personal[e.gid] || {};
	});
};


module.exports = {
	upsertClause,
	populateGalleryData,
};