const crypto = require('crypto');
const apiKeyRepo = require('../models/repositories/apiKey.repo'); 
const { asyncHandler } = require('../helpers/handler/asyncHandler');
const { ForbiddenError } = require('../core/error.response'); 

const apiKey = asyncHandler(async (req, res, next) => {
    const key = req.headers['x-api-key']?.toString();
    if (!key) {
        throw new ForbiddenError({ message: 'Missing API Key' });
    }
    
    const hashedKey = crypto.createHash('sha256').update(key).digest('hex');
    
    const objKey = await apiKeyRepo.findById(hashedKey);

    if (!objKey) {
        throw new ForbiddenError({ message: 'The API Key is invalid or has been blocked' });
    }

    req.objKey = objKey;
    return next();
});

module.exports = apiKey;