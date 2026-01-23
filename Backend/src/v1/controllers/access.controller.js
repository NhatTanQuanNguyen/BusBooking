const { OK } = require('../core/success.response')
const AccessService = require('../services/access.service')
const { logger } = require('../helpers/logger/myLogger')

class AccessController {
    login = async (req, res, next) => {
        logger.info('LOGIN_REQUEST', {
            email: req.body.email,
            ip: req.ip
        })

        return new OK({
            message: 'Login success',
            data: await AccessService.login(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()
