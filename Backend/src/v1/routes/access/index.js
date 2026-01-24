const router = require('express').Router()
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const accessController = require('../../controllers/access.controller')
const { validateRequest } = require('../../middleware/validateRequest.middware')
const { loginSchema } = require('../../validators/access.validators')

router.post('/login',validateRequest(loginSchema) , asyncHandler(accessController.login))

module.exports = router
