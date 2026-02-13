const router = require('express').Router()
const { generateApiKey } = require('../../controllers/api.key.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const { generate } = require('../../validations/api.key.validate')
const { validateData } = require('../../middleware/validate.middleware')

router.post(
    "/generate",
    validateData(generate),
    asyncHandler(generateApiKey)
)

module.exports = router