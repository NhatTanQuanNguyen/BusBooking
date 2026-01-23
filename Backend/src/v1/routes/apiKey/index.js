const express = require('express');
const router = express.Router();
const apiKeyController = require('../../controllers/apiKey.controller');
const { asyncHandler } = require('../../helpers/handler/asyncHandler');

router.post('/create', asyncHandler(apiKeyController.create));

router.delete('/:key', asyncHandler(apiKeyController.delete));

module.exports = router;