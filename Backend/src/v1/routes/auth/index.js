const express = require('express')
const router = express.Router()


const AuthController = require('../../controllers/auth.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')

router.post('/register', asyncHandler(AuthController.register))

module.exports = router
