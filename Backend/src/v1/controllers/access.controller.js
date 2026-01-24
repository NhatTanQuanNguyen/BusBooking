const { OK } = require('../core/success.response')
const AccessService = require('../services/access.service')
const { logger } = require('../helpers/logger/myLogger')

class AccessController {
    login = async (req, res, next) => {
        try {
            logger.info('LOGIN_REQUEST', {
                requestId: req.requestId,
                email: req.body.email,
                ip: req.ip
            })

            const result = await AccessService.login({
                email: req.body.email,
                password: req.body.password,
                requestId: req.requestId
            })

            return new OK({
                message: 'Login success',
                data: result
            }).send(res)

        } catch (error) {
            logger.error('LOGIN_FAILED', {
                requestId: req.requestId,
                error: error.message
            })
            next(error)
        }
    }
}


module.exports = new AccessController()
