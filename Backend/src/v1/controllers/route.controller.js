const {RouteService} = require('../services/route.service')
const {OK} = require('../core/success.response')

class RouteController {

    //post
    createRoute = async (req, res, next) => {
        const { busCompanyId, requestId } = req
        const route = await RouteService.createRoute(
            {
                busCompanyId,
                payload: req.body
            },
            {requestId}
        )
        return new OK({
            message: 'Route created successfully',
            data: route
        }).send(res)
    }

    //get/routes/:id
    getRouteById = async (req, res, next) => {
        const { busCompanyId, requestId } = req
        const route = await RouteService.getRouteById(
            {
                busCompanyId,
                routeId: req.params.id
            },
            {requestId}
        )
        return new OK({
            message: 'Route detail',
            data: route
        }).send(res)
    }

    // GET /routes/active
    listActiveRoutes = async (req, res, next) => {
        const { busCompanyId, requestId } = req
        const { limit = 10, skip = 0, originId, destinationId } = req.query

        const filter = {}
        if (originId) filter.originId = originId
        if (destinationId) filter.destinationId = destinationId

        const routes = await RouteService.listActiveRoutes(
            {
                busCompanyId,
                filter,
                limit,
                skip
            },
            { requestId }
        )

        return new OK({
            message: 'Active route list',
            data: routes
        }).send(res)
    }

    // GET /routes/inactive
    listInactiveRoutes = async (req, res, next) => {
        const { busCompanyId, requestId } = req
        const { limit = 10, skip = 0 } = req.query

        const routes = await RouteService.listInactiveRoutes(
            {
                busCompanyId,
                limit,
                skip
            },
            { requestId }
        )

        return new OK({
            message: 'Inactive route list',
            data: routes
        }).send(res)
    }

    //patch
    updateRoute = async (req, res, next) => {
        const { busCompanyId, requestId } = req
        const route = await RouteService.updateRoute(
            {
                busCompanyId,
                routeId: req.params.id,
                payload: req.body
            },
            {requestId}
        )
        return new OK({
            message: 'Route updated successfully',
            data: route
        }).send(res)
    }

    //delete
    deleteRoute = async (req, res, next) => {
        const { busCompanyId, requestId } = req
        await RouteService.deleteRoute(
            {
                busCompanyId,
                routeId: req.params.id
            },
            {requestId}
        )
        return new OK({
            message: 'Route deleted successfully'
        }).send(res)
    }

    // PATCH /routes/:id/activate
    activateRoute = async (req, res, next) => {
        const { busCompanyId, requestId } = req

        const route = await RouteService.activateRoute(
            {
                busCompanyId,
                routeId: req.params.id
            },
            { requestId }
        )

        return new OK({
            message: 'Route activated',
            data: route
        }).send(res)
    }

    // PATCH /routes/:id/deactivate
    deactivateRoute = async (req, res, next) => {
        const { busCompanyId, requestId } = req

        const route = await RouteService.deactivateRoute(
            {
                busCompanyId,
                routeId: req.params.id
            },
            { requestId }
        )

        return new OK({
            message: 'Route deactivated',
            data: route
        }).send(res)
    }
}

module.exports = {
    RouteController: new RouteController()
}