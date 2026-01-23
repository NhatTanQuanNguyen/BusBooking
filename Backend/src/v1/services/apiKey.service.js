const apiKeyRepo = require('../models/repositories/apiKey.repo');
const crypto = require('crypto');
const { BadRequestError } = require('../core/error.response');

class ApiKeyService {
    static create = async ({ permissions = ['0000'] }) => {
        const key = crypto.randomBytes(32).toString('hex');
        const hashedKey = crypto.createHash('sha256').update(key).digest('hex');

        const newKeyEntry = await apiKeyRepo.createApiKey({ 
            key: hashedKey, 
            permissions 
        });
        if (!newKeyEntry) throw new BadRequestError('Error creating API Key');

        return {
            apiKey: key,
            permissions: newKeyEntry.permissions
        };
    };

    static delete = async (key) => {
        const result = await apiKeyRepo.softDelete(key);
        
        if (!result) {
            throw new BadRequestError('API Key not found or already deleted');
        }
        
        return result;
    };
}

module.exports = ApiKeyService;