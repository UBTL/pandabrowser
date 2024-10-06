
const ConnectDB = require('../util/connectDB');
const getResponse = require('../util/getResponse');
const queryTags = require('../util/queryTags');

/**
 * @typedef {import('@types').ComicInfo} ComicInfo
 * @typedef {import('@types').Gallery} Gallery
 */

/**
 * Partial language tag -> ISO639 code map for the most common ones
 * @type {{[key: string]: string}}
 */
const ISO639_MAP = {
	"english": "en", "chinese": "zh", "japanese": "ja", "korean": "ko",
	"spanish": "es", "russian": "ru", "portuguese": "pt", "french": "fr",
	"thai": "th", "italian": "it", "dutch": "nl", "german": "de",
	"vietnamese": "vi", "polish": "pl", "indonesian": "id", "ukrainian": "uk",
	"hungarian": "hu", "arabic": "ar", "czech": "cs", "turkish": "tr",
	"tagalog": "tl", "bulgarian": "bg", "javanese": "jv", "finnish": "fi",
	"swedish": "sv", "greek": "el", "esperanto": "eo", "latin": "la",
	"hindi": "hi", "slovak": "sk", "persian": "fa", "croatian": "hr",
	"romanian": "ro", "danish": "da", "norwegian": "no"
};

/** @type {{[key: string]: string}} */
const XML_CHARACTER_MAP = {
	'&': '&amp;',
	'"': '&quot;',
	"'": '&apos;',
	'<': '&lt;',
	'>': '&gt;'
};

/**
 * @param {string} string
 */
function xmlEscape(string) {
	return string && string.replace
		? string.replace(/([&"<>'])/g, function(str, item) {
			return XML_CHARACTER_MAP[item];
			})
		: string;
}

/**
 * 
 * @param {ComicInfo} info 
 * @returns {string}
 */
const generateComicInfoXML = (info) => {
	const identifier = '<?xml version="1.0" encoding="UTF-8"?>';
	const open = '<ComicInfo xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+
		'xmlns:xsd="http://www.w3.org/2001/XMLSchema">';
	const close = '</ComicInfo>';
	const content = Object.keys(info)
		.map(key => {
			const val = typeof info[key] == "string" ? info[key].replace('\n', '') : info[key];
			return `\t<${key}>${xmlEscape(val)}</${key}>`;
		}).join('\n');
	return `${identifier}\n${open}\n${content}\n${close}\n`;
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const comicInfo = async (req, res) => {
	const { gid = '' } = Object.assign({}, req.params, req.query);
	if (!/^\d+$/.test(gid)) {
		return res.json(getResponse(null, 400, 'gid is invalid'));
	}

	const conn = await new ConnectDB().connect();
	try {
		const sql = `SELECT * FROM gallery WHERE gid = ?`;

		/** @type {Gallery} */
		const result = (await conn.query(sql, [+gid]))[0];
		if (!result) {
			return res.json(getResponse(null, 404, 'no gallery matches gid'));
		}

		const tags = (await queryTags(conn, [+gid]))[gid] || [];

		const getTagsWithoutGivenPrefixes = (/** @type {string[]} */ prefixes) => (
			tags.filter(t => !prefixes.find(p => t.startsWith(p)))
		);
		const getTagsByPrefix = (/** @type {string} */ prefix) => (
			tags.filter(t => t.startsWith(prefix)).map(t => t.replace(prefix, ''))
		);

		const artists = getTagsByPrefix("artist:");
		const groups = getTagsByPrefix("group:");
		const characters = getTagsByPrefix("character:");
		const filteredTags = getTagsWithoutGivenPrefixes(['artist:','group:','character:']);
		// pick the first tag hit from the language map, not very accurate
		const lang = Object.keys(ISO639_MAP).find(c => tags.find(t => t == "language:" + c));

		/**
		 * While it's nice to have some information exchange format
		 * comicinfo's vagueness for different usecases is frustrating.
		 * Some readers have adopted "LocalizedSeries" for english names
		 * of manga but since it's non-standard we'll use Title
		 * @type {ComicInfo}
		 */
		const info = {
			Title: result.title,
			// LocalizedSeries: result.title,
			...result.title_jpn && {Series: result.title_jpn},
			...lang && {LanguageISO: ISO639_MAP[lang]},
			...result.filecount && {PageCount: result.filecount},
			// Penciller/Colorist/.. are all bad fit, compromise on Writer
			...artists.length && {Writer: artists.join(', ')},
			...groups.length && {Imprint: groups.join(', ')},
			...characters.length && {Characters: characters.join(', ')},
			Manga: 'Yes',
			CommunityRating: Number(result.rating).toFixed(1),
			Tags: filteredTags.join(', '),
			Web: `https://exhentai.org/g/${result.gid}/${result.token}/`,
		}

		res.header('Content-Type', 'text/xml');
		return res.send(generateComicInfoXML(info));
	} finally {
		conn.end();
	}
};

module.exports = comicInfo;