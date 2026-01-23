const { validationResult } = require('express-validator')
const { BadRequestError } = require('../core/error.response')

const validateRequest = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new BadRequestError({
      message: errors.array()[0].message,
      errors: errors.array()
    })
  }

  next()
}

module.exports = validateRequest
