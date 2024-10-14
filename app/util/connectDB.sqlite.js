const sqlite3 = require('better-sqlite3');
const config = require('../../config');

/** @type {import('better-sqlite3').Database?} */
let dbConnection = null;

/**
 * sqlite doesn't support binding array values as-is
 * (actually, to emulate array-binding the question mark could also
 * be replaced with `(SELECT e.value FROM json_each(?) e)`)
 * @param {string} query
 * @param {any[]} args
 */
const formatQuery = (query, args) => {
	let argIndex = 0;
	return query.replace(/\?/g, () => {
		const arg = args[argIndex++];
		if (Array.isArray(arg)) {
			return arg.map(() => '?').join(', ');
		}
		return '?';
	});
};
const flatten = (arr) => {
	return arr.reduce((flat, toFlatten) => 
		flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);
};
const escape = (val) => {
	if (Array.isArray(val)) {
		return val.map(escape).join(',');
	}
	switch (typeof val) {
		case 'string':
			return `'${val.replace(/'/g, "''")}'`;
		case 'boolean':
			return +val;
	}
	return val;
};

const xor = (a, b) => (a | b) & ~(a & b);

const bit_count = (num) => {
	let count = 0;
	while (num !== 0) {
	  count += num & 1;
	  num >>>= 1;
	}
	return count;
};

class ConnectDB {
	constructor() {
		if (!dbConnection) {
			dbConnection = sqlite3(`${config.dbPath}/gallery.db`, {});
			for (const name of ['torrent', 'thumbnail', 'personal']) {
				dbConnection.exec(`attach database '${config.dbPath}/${name}.db' as ${name};`);
			}
			dbConnection.pragma('journal_mode = WAL');
			// TODO: replace with native functions
			dbConnection.function('XOR', xor);
			dbConnection.function('bit_count', bit_count);
			// 50% improvement to imgsearch
			dbConnection.pragma(`mmap_size = ${512e6}`);
		}
		this.connection = this;
	}

	async connect() {
		return this;
	}

	/**
	 * @param {string} query
	 * @param {any[]} params
	 */
	format(query, params) {
		return query.replace(/\?/g, () => escape(params.shift()))
	}

	/**
	 * @param {string} query
	 * @param {any[]} params
	 */
	async query(query, params=[]) {
		if (!dbConnection) return;
		query = formatQuery(query, params)
		try {
			const stmt = dbConnection.prepare(query);
			// FIXME: a hack, query/execute should be separated
			if (query.match(/^select|^with/i)) {
				return stmt.all(...flatten(params));
			}
			// for sqlite booleans are integers
			params = params.map(p => (
				typeof p == "boolean" ? +p : p
			));
			return stmt.run(...flatten(params));
		} catch (ex) {
			console.error(query, flatten(params), ex);
			throw ex;
		}
	}

	destroy() {}

	end() {}
}

/* could close when process exits but technically not necessary
process.on('SIGTERM', () => {
	dbConnection?.close();
	process.exit(0);
});*/

module.exports = ConnectDB;