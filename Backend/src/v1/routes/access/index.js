const router = require('express').Router()
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const accessController = require('../../controllers/access.controller')

router.post('/login', asyncHandler(accessController.login))

module.exports = router
