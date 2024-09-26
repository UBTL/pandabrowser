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

	async getHashedThumbs() {
		const sql = `SELECT thumb FROM thumbnail
			WHERE thumb NOT LIKE '%/%' AND
				ph0 IS NOT NULL AND bitcount IS NOT NULL`;
		return (await this.query(sql)).map(row => row.thumb);
	}

	async getFilesToProcess() {
		let t1 = Date.now();
		const hashed = await this.getHashedThumbs();
		console.log(`found ${hashed.length} hashes in db (${Date.now()-t1}ms)`);

		t1 = Date.now();
		const thumbdir = path.join(config.webuiPath, 'pandathumbs', '**');
		const files = await fg.glob(thumbdir, { onlyFiles: true });
		console.log(`found ${files.length} thumb files (${Date.now()-t1}ms)`);

		const hashedSet = new Set(hashed);
		return files.filter(x => !hashedSet.has(path.basename(x)));
	}

	async saveThumbnailHash(rec) {
		const cols = ['thumb', 'ph0', 'ph1', 'ph2', 'ph3', 'bitcount'];
		const sql = `INSERT INTO thumbnail (${cols})
			VALUES (?, ?,?,?,?, ?)
			ON DUPLICATE KEY UPDATE
				${[0,1,2,3].map(i => `ph${i}=VALUES(ph${i})`).join(',')},
				bitcount=VALUES(bitcount);`;

		return this.query(sql, cols.map((c) => rec[c]));
	}

	async run() {
		try {
			await this.query('SET NAMES UTF8MB4');

			console.log("checking status ...");
			const toProcess = await this.getFilesToProcess();
			console.log(`found ${toProcess.length} files to process`);

			if (toProcess.length == 0) {
				return;
			}

			// min 1 (# of files/CPUs) or max 8
			const numWorkers = Math.min(toProcess.length, Math.min(8, Math.ceil(numCPUs / 2)));
			if (numWorkers > 1) {
				console.log(`dividing work to ${numWorkers} workers (time left stabilises at 1%)`);
			}

			const progress = tqdm(toProcess);

			await clusterControl(numWorkers, toProcess, async (ret) => {
				try {
					await this.saveThumbnailHash(ret);
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
			this.getDb().end();
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