const express = require('express');
const router = express.Router();
const apiKeyController = require('../../controllers/apiKey.controller');
const validateApiKey = require('../../middleware/apiKeyValidate.middleware');
const { asyncHandler } = require('../../helpers/handler/asyncHandler');

router.post('/create', 
    validateApiKey('create', 'body'), 
    asyncHandler(apiKeyController.create)
);

router.delete('/:key', 
    validateApiKey('delete', 'params'), 
    asyncHandler(apiKeyController.delete)
);

module.exports = router;