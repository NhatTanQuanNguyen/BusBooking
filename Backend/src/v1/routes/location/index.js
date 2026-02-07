const router = require('express').Router()
const { LocationController } = require('../../controllers/location.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const { authentication } = require('../../authentication/index')
const { requiredPermission } = require('../../middleware')
const locationValidate = require('../../validates/location.validate')
const validate = require('../../validates/validate')

// GET /locations/active
router.get(
  '/active',
  validate(locationValidate.listLocations),
  asyncHandler(LocationController.listActiveLocations)
)

// GET /locations/inactive
router.get(
  '/inactive',
  validate(locationValidate.listLocations),
  asyncHandler(LocationController.listInactiveLocations)
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

// PATCH /locations/:id/activate
router.patch(
  '/:id/activate',
  // authentication,
  // requiredPermission('location:update'),
  validate(locationValidate.changeStatus),
  asyncHandler(LocationController.activateLocation)
)

// PATCH /locations/:id/deactivate
router.patch(
  '/:id/deactivate',
  // authentication,
  // requiredPermission('location:update'),
  validate(locationValidate.changeStatus),
  asyncHandler(LocationController.deactivateLocation)
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