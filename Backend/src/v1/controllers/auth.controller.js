const { OK } = require('../core/success.response')
const RegisterService = require('../services/register.service')
const { logger } = require('../helpers/logger/myLogger')

class AuthController {
  register = async (req, res) => {
    logger.info(
      '[AUTH][REGISTER] Request',
      req.requestId,
      { email: req.body.email }
    )

    const result = await RegisterService.register(req.body, req.requestId)

    logger.info(
      '[AUTH][REGISTER] Success',
      req.requestId,
      { userId: result.user.id }
    )

    return new OK({
      message: 'Register successfully',
      data: result
    }).send(res)
  }
}

module.exports = new AuthController()
