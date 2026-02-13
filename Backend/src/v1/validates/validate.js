const { BadRequestError } = require('../core/error.response')

const validate = (schema) => (req, res, next) => {
  const parts = ['body', 'query', 'params']

  for (const part of parts) {
    if (schema[part]) {
      const { error, value } = schema[part].validate(req[part], {
        abortEarly: false,
        stripUnknown: true
      })

      if (error) {
        throw new BadRequestError({
          message: error.details.map(d => d.message).join(', ')
        })
      }

      req[part] = value
    }
  }

  next()
}

module.exports = validate
