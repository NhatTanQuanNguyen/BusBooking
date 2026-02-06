const router = require('express').Router()
const { LocationController } = require('../../controllers/location.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const { authentication } = require('../../authentication/index')
const { requiredPermission } = require('../../middleware')
const locationValidate = require('../../validates/location.validate')
const validate = require('../../validates/validate')

router.get(
  '/',
  //requiredPermission('location:read'),
  validate(locationValidate.listLocations),
  asyncHandler(LocationController.listLocations)
)

router.get(
  '/:id',
  //requiredPermission('location:read'),
  validate(locationValidate.getLocationById),
  asyncHandler(LocationController.getLocationById)
)

router.post(
  '/',
  //authentication,
  //requiredPermission('location:create'),
  validate(locationValidate.createLocation),
  asyncHandler(LocationController.createLocation)
)

router.patch(
  '/:id',
  //authentication,
  //requiredPermission('location:update'),
  validate(locationValidate.updateLocation),
  asyncHandler(LocationController.updateLocation)
)

router.delete(
  '/:id',
  //authentication,
  //requiredPermission('location:delete'),
  validate(locationValidate.deleteLocation),
  asyncHandler(LocationController.deleteLocation)
)

module.exports = router