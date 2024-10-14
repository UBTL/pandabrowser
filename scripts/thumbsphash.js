const cluster = require('cluster');
const fg = require('fast-glob');
const fs = require("fs");
const path = require('path');
const phash = require("sharp-phash");
const tqdm = require('tqdm');
const config = require('../config');
const ConnectDB = require('../app/util/connectDB');
const { upsertClause } = require('../app/util/queryCommon');

const numCPUs = require('os').cpus().length;

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
		this.db = null;
	}
	async query(...args) {
		if (!this.db) {
			this.db = await new ConnectDB().connect();
		}
		return this.db.query(...args);
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
		const basedir = process.pkg ? process.cwd() : config.webuiPath;
		const thumbdir = path.join(basedir, 'pandathumbs', '**');
		const files = await fg.glob(thumbdir, { onlyFiles: true });
		console.log(`found ${files.length} thumb files (${Date.now()-t1}ms)`);

		const hashedSet = new Set(hashed);
		return files.filter(x => !hashedSet.has(path.basename(x)));
	}

	async saveThumbnailHash(rec) {
		const updateCols = ['ph0', 'ph1', 'ph2', 'ph3', 'bitcount'];
		const cols = ['thumb'].concat(updateCols);
		const sql = `INSERT INTO thumbnail (${cols})
			VALUES (${cols.map(c => '?').join(',')})
			${upsertClause(updateCols, 'thumb')}`;
		return this.query(sql, cols.map((c) => rec[c]));
	}

	async run() {
		try {
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
			this.db?.end();
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