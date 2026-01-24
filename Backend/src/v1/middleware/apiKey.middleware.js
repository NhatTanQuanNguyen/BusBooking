const crypto = require('crypto');
const apiKeyRepo = require('../models/repositories/apiKey.repo');
const { ForbiddenError } = require('../core/error.response');
const { logger } = require('../helpers/logger/myLogger'); 

const apiKeyMiddleware = async (req, res, next) => {
    const requestId = req.headers['x-request-id'] || 'unknown-id';

    try {
        const key = req.headers['x-api-key']?.toString();

        if (!key) {
            const error = new ForbiddenError({ message: 'Missing API Key' });
            logger.error(error.message, requestId, {
                url: req.originalUrl,
                method: req.method,
                ip: req.ip
            });

            return next(error);
        }

        const hashedKey = crypto.createHash('sha256').update(key).digest('hex');
        const objKey = await apiKeyRepo.findById(hashedKey);

        if (!objKey) {
            const error = new ForbiddenError({ message: 'The API Key is invalid or has been blocked' });
            logger.error(error.message, requestId, {
                url: req.originalUrl,
                hashedKey: hashedKey, 
                method: req.method
            });

            return next(error);
        }

        req.objKey = objKey;
        return next();

    } catch (error) {
        logger.error(error.message, requestId, {
            stack: error.stack, 
            url: req.originalUrl
        });

        return next(error);
    }
};

module.exports = apiKeyMiddleware;