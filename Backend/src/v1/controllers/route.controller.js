const {RouteService} = require('../services/route.service')
const {OK} = require('../core/success.response')

class RouteController {

    //post
    createRoute = async (req, res, next) => {
        const busCompanyId = req.busCompanyId
        const requestId = req.requestId
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
        const busCompanyId = req.busCompanyId
        const requestId = req.requestId
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

    //get/routes
    listRoutes = async (req, res, next) => {
        const {
            limit = 10,
            skip = 0,
            status,
            originId,
            destinationId
        } = req.query

        const filter = {}
        if (status) filter.status = status
        if (originId) filter.originId = originId
        if (destinationId) filter.destinationId = destinationId

        const busCompanyId = req.busCompanyId
        const requestId = req.requestId
        const routes = await RouteService.listRoutes(
            {
                busCompanyId,
                filter,
                limit,
                skip
            },
            {requestId}
        )
        return new OK({
            message: 'Route list',
            data: routes,
            meta: {
                limit,
                skip,
                count: routes.length
            }
        }).send(res)
    }

    //patch
    updateRoute = async (req, res, next) => {
        const busCompanyId = req.busCompanyId
        const requestId = req.requestId
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
        const busCompanyId = req.busCompanyId
        const requestId = req.requestId
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
}

module.exports = {
    RouteController: new RouteController()
}