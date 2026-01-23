const router = require('express').Router()
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const accessController = require('../../controllers/access.controller')
const { validate } = require('../../middleware/validation.middware')
const { loginSchema } = require('../../validators/access.validators')

router.post('/login',validate(loginSchema) , asyncHandler(accessController.login))

module.exports = router
