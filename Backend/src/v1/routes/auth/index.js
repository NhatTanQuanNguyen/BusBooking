const router = require('express').Router()
const { AccessController } = require('../../controllers/access.controller')
const {asyncHandler} = require("../../helpers/handler/asyncHandler")

router.post(
    "/register",
    asyncHandler(AccessController.register)
)
router.post(
    "/login",
    asyncHandler(AccessController.login)
)

router.get(
    "/logout",
    asyncHandler(AccessController.logout)
)


module.exports = router