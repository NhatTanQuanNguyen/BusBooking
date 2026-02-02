const { BadRequestError } = require("../core/error.response")
const { OK } = require("../core/success.response")
const { ApiKeyServices } = require("../services/api.key.service")

const generateApiKey = async (req,res,next) => {
    const {permission, company_id} = req.body

    if (!permission) throw new BadRequestError({
        message : " missing permission"
    })
    return new OK({
        message : "sucess",
        data : await ApiKeyServices.generate({permission, company_id})
    }).send(res)
}

module.exports = {
    generateApiKey
}