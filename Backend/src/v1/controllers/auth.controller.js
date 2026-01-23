const { OK } = require('../core/success.response')
const RegisterService = require('../services/register.service')

class AuthController {
  register = async (req, res, next) => {
    try {
      const result = await RegisterService.register(req.body)

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
