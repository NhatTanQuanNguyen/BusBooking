const { BadRequestError } = require("../core/error.response")
const { OK } = require("../core/success.response")
const { logger } = require("../helpers/logger/myLogger")
const { ApiKeyServices } = require("../services/api.key.service")

const generateApiKey = async (req,res,next) => {
    const requestId = req.requestId
    const {permission, company_id} = req.body

    logger.info('API Key generation request received', { requestId, company_id, permission })

    return new OK({
        message : "success",
        data : await ApiKeyServices.generate({permission, company_id}, {requestId})
    }).send(res)
}

module.exports = {
    generateApiKey
}