const { helloController } = require('../controllers');
const { asyncHandler } = require('../helpers/handler/asyncHandler');
const { logger } = require('../helpers/logger/myLogger');
const { generateRequestId } = require('../middleware');

const router = require('express').Router()


router.get("/hello",generateRequestId,asyncHandler(helloController))

module.exports = router;