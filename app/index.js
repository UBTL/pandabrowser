const express = require('express');
const path = require('path');
const router = require('./router');
const useCors = require('./util/useCors');
const config = require('../config');
const { port = 8880, cors = false, corsOrigin, webui, webuiPath } = config;


const app = express();

app.use(useCors(cors, corsOrigin));
app.use(express.json());
if (webui) {
	if (process.pkg) {
		app.use('/pandathumbs', express.static(path.resolve(process.cwd(), 'pandathumbs')));
	}
	app.use(express.static(path.resolve(__dirname, '../', webuiPath)));
}
app.all('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, './assets/sadpanda.jpg'), {
		maxAge: 86400
	});
});
app.use('/', router);
app.listen(port, () => {
	console.log(`Server is now listening at http://localhost:${port}`);
});

app.on('error', (err) => {
	console.error(err);
});
process.on('uncaughtException', (err) => {
	console.error(err);
});