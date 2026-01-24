const { OK } = require('../core/success.response')
const AccessService = require('../services/access.service')
const { logger } = require('../helpers/logger/myLogger')
const { UnauthorizedError } = require('../core/error.response')

class AccessController {
    login = async (req, res) => {
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

            throw new UnauthorizedError({
                message: 'email or password is incorrect'
            })
        }
    }
}

module.exports = new AccessController()
