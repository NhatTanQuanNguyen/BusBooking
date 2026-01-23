const ApiKeyService = require('../services/apiKey.service');
const { SuccessResponse, OK } = require('../core/success.response');

class ApiKeyController {
    create = async (req, res, next) => {
        new SuccessResponse({
            message: 'API Key created successfully',
            statusCode: 201,
            data: await ApiKeyService.create({
                permissions: req.body.permissions
            })
        }).send(res);
    };

    delete = async (req, res, next) => {
        const { key } = req.params;
        new OK({
            message: 'API Key deleted successfully',
            data: await ApiKeyService.delete(key)
        }).send(res);

    };
}

module.exports = new ApiKeyController();