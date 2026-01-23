const express = require('express')
const router = express.Router()


const AuthController = require('../../controllers/auth.controller')
const RegisterValidate = require('./register.validate')
const validate = require('../../middleware/validate.middleware')

router.post(
  '/register',
  validate(RegisterValidate),
  AuthController.register
)

module.exports = router
