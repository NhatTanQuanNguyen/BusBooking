const { BadRequestError } = require('../../core/error.response')

const validate = (schema, payload) => {
  const { error, value } = schema.validate(payload, {
    abortEarly: false,
    allowUnknown: false
  })

  if (error) {
    throw new BadRequestError({
      message: 'Validation failed',
      errors: error.details.map(e => ({
        message: e.message,
        path: e.path.join('.')
      }))
    })
  }

  return value
}

module.exports = { validate }