const { Router } = require('express');
const personal = require('../../action/personal');
const catchError = require('../../util/catchError');

const router = Router();
router.use('/', catchError(personal));

module.exports = router;