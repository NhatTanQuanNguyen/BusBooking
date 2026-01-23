const apiKeyModel = require('../apiKey.model');

class ApiKeyRepository {
    createApiKey = async ({ key, permissions }) => {
        return await apiKeyModel.create({
            key,
            permissions
        });
    };

    findById = async (key) => {
        return await apiKeyModel.findOne({ 
            key, 
            status: true, 
            isDeleted: false 
        }).lean();
    };

    updateApiKey = async (key, payload) => {
        return await apiKeyModel.findOneAndUpdate({ key }, payload, { 
            new: true 
        });
    };

    softDelete = async (key) => {
        return await apiKeyModel.findOneAndUpdate(
            { key, isDeleted: false },
            { isDeleted: true }, 
            { new: true }
        );
    };
}

module.exports = new ApiKeyRepository();