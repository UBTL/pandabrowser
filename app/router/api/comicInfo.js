const { Router } = require('express');
const comicInfo = require('../../action/comicInfo');
const catchError = require('../../util/catchError');

const router = Router();
router.use('/', catchError(comicInfo));

module.exports = router;