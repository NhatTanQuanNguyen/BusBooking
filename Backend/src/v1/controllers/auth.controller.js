const { OK } = require('../core/success.response')
const AccessServices = require('../services/access.service')

class AuthController {

    register = async (req, res, next) => {
        try {
            const { email, password, fullName } = req.body

            const result = await AccessServices.register({
                email,
                password,
                fullName
            })

            return new OK({
                message: 'Register successfully',
                data: result
            }).send(res)

        } catch (error) {
            next(error) 
        }
    }
}

module.exports = new AuthController()
