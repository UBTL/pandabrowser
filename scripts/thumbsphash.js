const cluster = require('cluster');
const fg = require('fast-glob');
const fs = require("fs");
const mysql = require('mysql');
const path = require('path');
const phash = require("sharp-phash");
const tqdm = require('tqdm');

const config = require('../config');

const numCPUs = require('os').cpus().length;

/**
* @typedef {import('mysql/lib/Connection')} Connection
*/

async function clusterControl(numWorkers, work, itemDoneCb) {

	// assign work sequentially to reduce HDD seeking
	const getRoundRobinBatch = (workerId) => {
		const items = [];
		for (let i = workerId; i < work.length; i += numWorkers) {
			items.push(work[i]);
		}
		return items;
	};

	return new Promise((resolve) => {
		for (let i = 0; i < numWorkers; i++) {
			const worker = cluster.fork();

			worker.send(getRoundRobinBatch(i));

			worker.on('message', itemDoneCb);

			worker.on('exit', () => {
				if (Object.keys(cluster.workers).length === 0) {
					resolve();
				}
			});
		}
	});
}

class ThumbsPHash {
	constructor() {
		var args = process.argv.slice(2);
		if (!args.length || !['all','new'].includes(args[0])) {
			console.log(`Syntax: node ${__filename} [all|new]\n
				all\tFind thumbs on disk, hashes in db, and process any files missing from db
				new\tUsing latest timestamp from db find and process any thumbs newer than that
			`);
			process.exit(1);
		}
		this.processAll = (args[0] == 'all');
	}

	/**
	 * 
	 * @returns {Connection}
	 */
	getDb() {
		if (!this._db) {
			this._db = mysql.createConnection({
				host: config.dbHost,
				port: config.dbPort,
				user: config.dbUser,
				password: config.dbPass,
				database: config.dbName,
				timeout: 10e3,
			});
			this._db.on('error', (err) => {
				console.error(err);
			});
		}
		return this._db;
	}

	query(...args) {
		return new Promise((resolve, reject) => {
			try {
				this.getDb().query(...args, (error, results) => {
					if (error) {
						reject(error);
						return;
					}
					resolve(results);
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	async getThumbFiles(newerThan = null) {
		const thumbdir = path.join(config.webuiPath, 'pandathumbs', '**');
		const opts = {
			onlyFiles: true,
			stats: !!newerThan,
			/* on regular glob non-stream stats would hog GBs of memory
			ignore: newerThan && {
				ignored: p => {
					return p.mtime < newerThan;
				},
			},
			*/
		};

		if (!newerThan) {
			return fg(thumbdir, opts);
		}

		return new Promise(async (resolve, reject) => {
			const recentFiles = [];
			for await (const entry of fg.globStream(thumbdir, opts)) {
				if (entry.stats.mtimeMs > newerThan) {
					recentFiles.push(entry.path);
				}
			}
			resolve(recentFiles);
		});
	}

	async getThumbMaxTime() {
		const sql = 'SELECT UNIX_TIMESTAMP(max(added)) added FROM gallery_thumb_hash';
		const rows = await this.query(sql);
		return new Date(rows.length ? rows[0].added * 1000 : 0);
	}

	async getHashedThumbs() {
		const sql = "SELECT thumb FROM gallery_thumb_hash";
		return (await this.query(sql)).map(row => row.thumb);
	}

	async getUnhashedThumbs() {
		const sql = 'SELECT DISTINCT g.thumb FROM gallery g ' +
			'LEFT JOIN gallery_thumb_hash h ON (g.thumb=h.thumb) ' +
			'WHERE h.thumb IS NULL';

		return (await this.query(sql)).map(row => row.thumb);
	}

	async getFilesToProcess() {
		if (this.processAll) {
			let t1 = Date.now();
			const hashed = await this.getHashedThumbs();
			console.log(`found ${hashed.length} hashes in db (${Date.now()-t1}ms)`);
			t1 = Date.now();
			const files = await this.getThumbFiles();
			console.log(`found ${files.length} thumb files (${Date.now()-t1}ms)`);

			const hashedSet = new Set(hashed);
			return files.filter(x => !hashedSet.has(path.basename(x)));
		} else {
			const maxTime = await this.getThumbMaxTime();
			if (maxTime === 0) {
				console.log(`Error: DB hash-table appears to be empty, for first time use 'all' argument`);
				process.exit(2);
			}
			let t1 = Date.now();
			const files = await this.getThumbFiles(maxTime);
			console.log(`found ${files.length} files newer than ${maxTime.toISOString()} (${Date.now()-t1}ms)`);
			return files;
		}
	}

	async run() {
		try {
			await this.query('SET NAMES UTF8MB4');

			console.log("checking status ...");
			const toProcess = await this.getFilesToProcess();

			// min 1 (# of files/CPUs) or max 8
			const numWorkers = Math.min(toProcess.length, Math.min(8, Math.ceil(numCPUs / 2)));
			if (numWorkers > 1) {
				console.log(`dividing work to ${numWorkers} workers (time left stabilises at 1%)`);
			}

			const progress = tqdm(toProcess);

			await clusterControl(numWorkers, toProcess, async (ret) => {
				try {
					await this.query('INSERT INTO gallery_thumb_hash SET ?', ret);
				} catch (ex) {
					console.error(`@ file ${ret.thumb}:`, ex.toString());
					process.exit();
				}
				progress.next();
			});
			console.log("done.")
		} catch (err) {
			console.error(err.stack);
		} finally {
			this.getDb().destroy();
			process.exit();
		}
	}
};

async function workerProcess(chunk) {
	for (const f of chunk) {
		const thumb = path.basename(f);
		try {
			const hash = await phash(fs.readFileSync(f));
			const [ph0,ph1,ph2,ph3] = hash.match(/.{1,16}/g).map(i => parseInt(i, 2));
			const bitcount = hash.split('1').length - 1;
			process.send({thumb, ph0,ph1,ph2,ph3, bitcount});
		} catch (ex) {
			console.error(`Error with ${thumb}:`, ex.toString());
		}
	}
	process.exit();
}

if (cluster.isWorker) {
	process.on('message', workerProcess);
} else {
	const instance = new ThumbsPHash();
	instance.run().catch(err => {
		console.log(err.stack);
	});
}