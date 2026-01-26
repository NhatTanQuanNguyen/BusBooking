const { OK } = require("../core/success.response")
const { AccessService } = require("../services/access.service")
const {logger} = require("../helpers/logger/myLogger")

class AccessController{
    login = async (req,res,next) => {
        const requestId = req.requestId

        logger.info('Login request received', {
            requestId,
            email: req.body?.email
        })

        const data = await AccessService.login(req.body,{ requestId })

        logger.info('Login request completed', {
            requestId
        })

        return new OK({
            message : "login success",
            data
        }).send(res)
    }

    register = async (req,res,next) => {
        const requestId = req.requestId

        logger.info('Register request received', {
            requestId,
            email: req.body?.email
        })

        const data = await AccessService.register(req.body,{ requestId })

        logger.info('Register request completed', {
            requestId
        })

        return new OK({
            message : "register success",
            data
        }).send(res)
    }

    logout = async (req,res,next) => {
        const requestId = req.requestId
        const {email} = req.headers

        console.log({email})

        logger.info('Logout request received', {
            requestId,
            email
        })

        const data = await AccessService.logout(
            { email},
            { requestId }
        )

        logger.info('Logout request completed', {
            requestId
        })

        return new OK({
            message : "logout success",
            data
        }).send(res)
    }
}

module.exports = {
    AccessController : new AccessController()
}
