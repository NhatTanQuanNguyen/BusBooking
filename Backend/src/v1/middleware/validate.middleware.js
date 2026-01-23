const { BadRequestError } = require('../core/error.response')

const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
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

    req[property] = value
    next()
  }
}

module.exports = validate