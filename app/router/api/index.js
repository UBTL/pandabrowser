const { Router } = require('express');
const gallery = require('./gallery');
const list = require('./list');
const tag = require('./tag');
const category = require('./category');
const uploader = require('./uploader');
const search = require('./search');
const searchImage = require('./searchImage');
const notFound = require('../../action/notFound');
const comicInfo = require('./comicInfo');

const router = Router();
router.use('/gallery', gallery);
router.use('/g', gallery);
router.use('/list', list);
router.use('/tag', tag);
router.use('/category', category);
router.use('/cat', category);
router.use('/uploader', uploader);
router.use('/search', search);
router.use('/searchimage', searchImage);
router.use('/comicInfo', comicInfo);
router.use('/', notFound);

module.exports = router;