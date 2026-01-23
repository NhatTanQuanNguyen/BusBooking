const express = require('express')
const router = express.Router()


const AuthController = require('../../controllers/auth.controller')
const RegisterValidate = require('./register.validate')
const validateRequest = require('../../middleware/validate.middleware')

router.post(
  '/register',
  RegisterValidate.register,  
  validateRequest,           
  AuthController.register    
)

module.exports = router
