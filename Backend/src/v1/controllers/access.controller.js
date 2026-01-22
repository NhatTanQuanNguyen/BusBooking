const { OK } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
    login = async (req, res, next) => {
        console.log('LOGIN API HIT', req.body)
        return new OK({
            message: 'Login success',
            data: await AccessService.login(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()
