const router = require('express').Router()
const { LocationController } = require('../../controllers/location.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const { authentication } = require('../../authentication/index')
const { requiredPermission } = require('../../middleware')

router.get(
  '/',
  //requiredPermission('location:read'),
  asyncHandler(LocationController.listLocations)
)

router.get(
  '/:id',
  //requiredPermission('location:read'),
  asyncHandler(LocationController.getLocationById)
)

router.post(
  '/',
  //authentication,
  //requiredPermission('location:create'),
  asyncHandler(LocationController.createLocation)
)

router.put(
  '/:id',
  //authentication,
  //requiredPermission('location:update'),
  asyncHandler(LocationController.updateLocation)
)

router.delete(
  '/:id',
  //authentication,
  //requiredPermission('location:delete'),
  asyncHandler(LocationController.deleteLocation)
)

module.exports = router