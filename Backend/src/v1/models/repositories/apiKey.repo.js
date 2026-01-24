const { ApiKeyModel } = require('../apiKey.model');

class ApiKeyRepository {
    createApiKey = async ({ key, permissions }) => {
        return await ApiKeyModel.create({
            key,
            permissions
        });
    };

    findById = async (key) => {
        return await ApiKeyModel.findOne({ 
            key, 
            status: true, 
            isDeleted: false 
        }).lean();
    };

    updateApiKey = async (key, payload) => {
        return await ApiKeyModel.findOneAndUpdate({ key }, payload, { 
            new: true 
        });
    };

    softDelete = async (key) => {
        return await ApiKeyModel.findOneAndUpdate(
            { key, isDeleted: false },
            { isDeleted: true }, 
            { new: true }
        );
    };
}

module.exports = new ApiKeyRepository();