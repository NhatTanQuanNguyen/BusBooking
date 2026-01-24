const Joi = require('joi')

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email không hợp lệ',
            'any.required': 'Email là bắt buộc'
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Password phải >= 6 ký tự',
            'any.required': 'Password là bắt buộc'
        })
})

module.exports = {
    loginSchema
}
