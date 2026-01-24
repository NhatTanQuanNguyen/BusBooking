const { BadRequestError } = require('../core/error.response')

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false
        })

        if (error) {
            throw new BadRequestError({
                message: error.details[0].message,
                errors: error.details.map(err => err.message)
            })
        }

        next()
    }
}

module.exports = {
    validateRequest
}
