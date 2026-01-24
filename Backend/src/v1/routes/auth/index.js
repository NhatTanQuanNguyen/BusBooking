const express = require('express')
const router = express.Router()


const AuthController = require('../../controllers/auth.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const { validate } = require('../../helpers/validate/validate')
const RegisterSchema = require('./register.validate')

router.post('/register', asyncHandler((req, res) => {
        req.body = validate(RegisterSchema, req.body)
        return AuthController.register(req, res)
    })
)

module.exports = router
