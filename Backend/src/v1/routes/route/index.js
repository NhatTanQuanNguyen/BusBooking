const router = require('express').Router()
const { RouteController } = require('../../controllers/route.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const { authentication } = require('../../authentication/index')
const { requiredPermission } = require('../../middleware')
const routeValidate = require('../../validates/route.validate')
const validate = require('../../validates/validate')

router.post('/', 
    //authentication, 
    //requiredPermission('route:create'),
    validate(routeValidate.createRoute), 
    asyncHandler(RouteController.createRoute)
)

router.get('/', validate(routeValidate.listRoutes), asyncHandler(RouteController.listRoutes))

router.get('/:id', validate(routeValidate.getRouteById), asyncHandler(RouteController.getRouteById))

router.patch('/:id', 
    //authentication,
    //requiredPermission('route:update'),
    validate(routeValidate.updateRoute), 
    asyncHandler(RouteController.updateRoute)
)

router.delete('/:id', 
    //authentication,
    //requiredPermission('route:delete'),
    validate(routeValidate.deleteRoute),
    asyncHandler(RouteController.deleteRoute)
)

module.exports = router