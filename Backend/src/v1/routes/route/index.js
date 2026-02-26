const router = require('express').Router()
const { RouteController } = require('../../controllers/route.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const { authentication } = require('../../authentication/index')
const { requiredPermission } = require('../../middleware')
const routeValidate = require('../../validates/route.validate')
const validate = require('../../validates/validate')

// GET /routes/active
router.get(
  '/active',
  validate(routeValidate.listRoutes),
  asyncHandler(RouteController.listActiveRoutes)
)

// GET /routes/inactive
router.get(
  '/inactive',
  validate(routeValidate.listRoutes),
  asyncHandler(RouteController.listInactiveRoutes)
)

// GET /routes/:id
router.get(
  '/:id',
  validate(routeValidate.getRouteById),
  asyncHandler(RouteController.getRouteById)
)

router.post('/', 
    //authentication, 
    //requiredPermission('route:create'),
    validate(routeValidate.createRoute), 
    asyncHandler(RouteController.createRoute)
)

router.patch('/:id', 
    //authentication,
    //requiredPermission('route:update'),
    validate(routeValidate.updateRoute), 
    asyncHandler(RouteController.updateRoute)
)

// PATCH /routes/:id/activate
router.patch(
  '/:id/activate',
  // authentication,
  // requiredPermission('route:update'),
  validate(routeValidate.changeStatus),
  asyncHandler(RouteController.activateRoute)
)

// PATCH /routes/:id/deactivate
router.patch(
  '/:id/deactivate',
  // authentication,
  // requiredPermission('route:update'),
  validate(routeValidate.changeStatus),
  asyncHandler(RouteController.deactivateRoute)
)

router.delete('/:id', 
    //authentication,
    //requiredPermission('route:delete'),
    validate(routeValidate.deleteRoute),
    asyncHandler(RouteController.deleteRoute)
)

module.exports = router