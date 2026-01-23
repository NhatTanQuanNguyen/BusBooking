const { OK } = require('../core/success.response')
const RegisterService = require('../services/register.service')
const { logger } = require('../helpers/logger/myLogger')
const { asyncHandler } = require('../helpers/handler/asyncHandler')

class AuthController {
  register = asyncHandler(async (req, res) => {
    logger.info(
      '[AUTH][REGISTER] Request',
      req.requestId,
      { body: req.body }
    )

    const result = await RegisterService.register(req.body)

    logger.info(
      '[AUTH][REGISTER] Success',
      req.requestId,
      { userId: result.user.id }
    )

    return new OK({
      message: 'Register successfully',
      data: result
    }).send(res)
  })
}

module.exports = new AuthController()
