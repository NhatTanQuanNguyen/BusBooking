const Joi = require('joi')

const objectIdSchema = Joi.string()
    .hex()
    .length(24)
    .required()

const generate = Joi.object({
    company_id: objectIdSchema,
    permission: Joi.string().valid('0000', '1111', '2222').required()
})

module.exports = {
    generate
}
