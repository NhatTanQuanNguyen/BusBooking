const ApiKeyService = require('../services/apiKey.service');
const { CREATED, OK } = require('../core/success.response');

class ApiKeyController {
    create = async (req, res, next) => {
    const requestId = req.headers['x-request-id'] || 'unknown-id'; 
    return new CREATED({
        message: 'API Key created successfully',
        data: await ApiKeyService.create({  
            permissions: req.body.permissions,
            requestId 
        })
    }).send(res);
};

    delete = async (req, res, next) => {
        const { key } = req.params;
        const requestId = req.headers['x-request-id'] || 'unknown-id'; 
        return new OK({
            message: 'API Key deleted successfully',
            data: await ApiKeyService.delete(key, requestId) 
        }).send(res);
    };
}

module.exports = new ApiKeyController();