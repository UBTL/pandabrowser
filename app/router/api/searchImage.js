const { Router } = require('express');
const multer = require('multer');
const searchImage = require('../../action/searchImage');
const catchError = require('../../util/catchError');

const upload = multer();

const router = Router();

router.post('/', upload.single('file'), catchError(searchImage));

module.exports = router;