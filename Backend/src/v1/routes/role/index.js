const router = require('express').Router()
const {asyncHandler} = require("../../helpers/handler/asyncHandler")
const roleController = require("../../controllers/role.controller")
const { requiredPermission } = require('../../middleware')

router.post(
    "/get-role",
    requiredPermission('role:read'),
    asyncHandler(roleController.getRole)
)

router.post(
    "/create-role",
    asyncHandler(roleController.createRole)
)

module.exports = router