const { BadRequestError } = require('../core/error.response')

/**
 * @param {Joi.Schema} schema 
 * @param {string} source 
 */
const validateData = (schema, source = 'body') => {
    return (req, res, next) => {
        try {
            const dataToValidate = req[source]
            
            const { error, value } = schema.validate(dataToValidate, {
                abortEarly: false,
                stripUnknown: true
            })

            if (error) {
                const details = error.details.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
                throw new BadRequestError({ 
                    message: 'Validation failed',
                    details 
                })
            }

            req[source] = value
            next()
        } catch (err) {
            next(err)
        }
    }
}

module.exports = {
    validateData,
}
