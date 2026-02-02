const router = require('express').Router()
const { RouteController } = require('../../controllers/route.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const { authentication } = require('../../authentication/index')
const { requiredPermission } = require('../../middleware')

router.post('/', 
    //authentication, 
    //requiredPermission('route:create'), 
    asyncHandler(RouteController.createRoute)
)

router.get('/', asyncHandler(RouteController.listRoutes))

router.get('/:id', asyncHandler(RouteController.getRouteById))

router.put('/:id', 
    //authentication,
    //requiredPermission('route:update'), 
    asyncHandler(RouteController.updateRoute)
)

router.delete('/:id', 
    //authentication,
    //requiredPermission('route:delete'),
    asyncHandler(RouteController.deleteRoute)
)

module.exports = router