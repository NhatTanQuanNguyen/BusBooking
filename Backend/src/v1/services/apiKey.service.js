const apiKeyRepo = require('../models/repositories/apiKey.repo');
const crypto = require('crypto');
const { BadRequestError } = require('../core/error.response');
const { logger } = require('../helpers/logger/myLogger'); 
const { apiKey_permissions } = require('../models/apiKey.model');

class ApiKeyService {
    /**
     * @param {Array} permissions 
     * @param {string} requestId 
     */
    static create = async ({ permissions = [apiKey_permissions.BASIC], requestId = '' }) => {
        const key = crypto.randomBytes(32).toString('hex');
        const hashedKey = crypto.createHash('sha256').update(key).digest('hex');

        const newKeyEntry = await apiKeyRepo.createApiKey({ 
            key: hashedKey, 
            permissions 
        });


        if (!newKeyEntry) {
            const errorMsg = 'Error creating API Key';
            
            logger.error(errorMsg, requestId, { permissions });
            throw new BadRequestError(errorMsg);
        }

        logger.info('API Key created successfully', requestId, { 
            permissions: newKeyEntry.permissions 
        });

        return {
            apiKey: key,
            permissions: newKeyEntry.permissions
        };
    };

    /**
     * @param {string} key 
     * @param {string} requestId 
     */
    static delete = async (key, requestId = '') => {
        try {
            const hashedKey = crypto.createHash('sha256').update(key).digest('hex');

            const result = await apiKeyRepo.softDelete(hashedKey);
            
            if (!result) {
                throw new Error('API Key not found or already deleted');
            }

            logger.info('API Key deleted successfully', requestId, { hashedKey });
            
            return result;

        } catch (error) {
            logger.error(`[SERVICE_ERROR]: ApiKeyService.delete failed`, requestId, {
                error: error.message,
                originalKey: key 
            });

            throw new BadRequestError({ message: error.message });
        }
    };
}

module.exports = ApiKeyService;