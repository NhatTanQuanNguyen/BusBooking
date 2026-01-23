const { body } = require('express-validator')

class RegisterValidate {
  static register = [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email'),

    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),

    body('fullName')
      .notEmpty().withMessage('Full name is required')
      .isLength({ min: 2 })
  ]
}

module.exports = RegisterValidate
