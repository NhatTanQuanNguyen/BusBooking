const { BadRequestError } = require("../core/error.response")
const { OK } = require("../core/success.response")
const { ApiKeyServices } = require("../services/api.key.service")

const generateApiKey = async (req,res,next) => {
    const {permission} = req.body

    if (!permission) throw new BadRequestError({
        message : " missing permission"
    })
    return new OK({
        message : "sucess",
        data : await ApiKeyServices.generate({permission})
    }).send(res)
}

module.exports = {
    generateApiKey
}