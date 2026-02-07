const RouteRepository = require('../models/repositories/route.repo')
const {BadRequestError, NotFoundError} = require('../core/error.response')
const { logger } = require('../helpers/logger/myLogger')
const { redisCacheService } = require('./cache.service')

class RouteService {
    
    //create
    async createRoute({busCompanyId, payload},  {requestId}) {
        logger.info('Create route started', { requestId, busCompanyId })
        const { originId, destinationId, code, minTime, maxTime } = payload

        if (originId === destinationId) {
            throw new BadRequestError({ message: 'Origin and destination must be different' })
        }
        if (minTime !== null && maxTime !== null && minTime > maxTime) {
            throw new BadRequestError({ message: 'minTime must be <= maxTime' })
        }

        const codeCacheKey = `route:code:${busCompanyId}:${code}`
        const cachedCode = await redisCacheService.getCache({ key: codeCacheKey })

        if (cachedCode) {
            throw new BadRequestError({ message: 'Route code already exists' })
        }

        const existed = await RouteRepository.exists({
            busCompanyId,
            filter: { code }
        })
        if (existed) {
            await redisCacheService.setCacheTTL({ 
                key: codeCacheKey, 
                value: true,
                ttl: 60
            })
            throw new BadRequestError({ message: 'Route code already exists' })
        }

        const route = await RouteRepository.create({
            busCompanyId,
            payload
        })

        logger.info('Route created successfully', {
            requestId,
            routeId: route._id
        })

        return route
    }

    //get by id
    async getRouteById({busCompanyId, routeId}, {requestId}) {
        const cacheKey = `route:detail:${busCompanyId}:${routeId}`

        const cached = await redisCacheService.getCache({key: cacheKey})
        if (cached) {
            logger.info('Route loaded from cache', { requestId, routeId })
            return cached
        }
        const route = await RouteRepository.findById({busCompanyId, routeId})
        if (!route) {
            throw new NotFoundError({ message: 'Route not found' })
        }
        await redisCacheService.setCache({
            key: cacheKey,
            value: route
        })

        logger.info('Route gotten successfully', {
            requestId,
            routeId: route._id
        })

        return route
    }

    //find list
    async listActiveLocations({ busCompanyId, limit, skip }, { requestId }) {
        const listCacheKey = `route:list:${busCompanyId}:${JSON.stringify({filter, limit, skip})}`
        const cached = await redisCacheService.getCache({key: listCacheKey})
        if (cached) return cached

        const routes = await RouteRepository.findMany({
            busCompanyId,
            filter: {
                status: 'ACTIVE'
            },
            skip
        })

        await redisCacheService.setCacheTTL({
            key: listCacheKey,
            value: routes,
            ttl: 180
        })

        logger.info('Active routes found', {
            requestId,
            total: routes.length
        })

        return routes
    }

    async listInactiveRoutes({ busCompanyId, limit, skip }, { requestId }) {
        const listCacheKey = `route:list:${busCompanyId}:${JSON.stringify({filter, limit, skip})}`
        const cached = await redisCacheService.getCache({key: listCacheKey})
        if (cached) return cached
        const routes = await RouteRepository.findMany({
            busCompanyId,
            filter: {
                status: 'INACTIVE'
            },
            limit,
            skip
        })

        await redisCacheService.setCacheTTL({
            key: listCacheKey,
            value: routes,
            ttl: 180
        })

        logger.info('Inactive routes found', {
            requestId,
            total: routes.length
        })

        return routes
    }
    
    //update
    async updateRoute({busCompanyId, routeId, payload}, {requestId}) {
        logger.info('Update route started', { requestId, routeId })

        const route = await RouteRepository.findById({ busCompanyId, routeId })
        if (!route) {
            throw new NotFoundError({ message: 'Route not found' })
        }

        if (route.status !== 'ACTIVE') {
            throw new BadRequestError({ message: 'Cannot update inactive route' })
        }

        if (!payload || Object.keys(payload).length === 0) {
            throw new BadRequestError('Update payload is empty')
        }

        const updateData = { ...payload }

        delete updateData.busCompanyId
        delete updateData.isDeleted
        delete updateData._id
        delete updateData.createdAt
        delete updateData.status
        delete updateData.code   
        delete updateData.originId
        delete updateData.destinationId

        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key]
            }
        })

        if (Object.keys(updateData).length === 0) {
            throw new BadRequestError('No valid fields to update')
        }

        const newMin = updateData.minTime ?? route.minTime
        const newMax = updateData.maxTime ?? route.maxTime

        if (newMin !== null && newMax !== null && newMin > newMax) {
            throw new BadRequestError('minTime must be <= maxTime')
        }

        const updated = await RouteRepository.updateById({
            busCompanyId,
            routeId,
            payload: updateData
        })

        if (!updated) {
            throw new NotFoundError({ message: 'Route not found' })
        }
        await redisCacheService.deleteCache({
            key: `route:detail:${busCompanyId}:${routeId}`
        })

        logger.info('Route updated successfully', {
            requestId,
            routeId
        })

        return updated
    }

    //change status
    async changeStatus({ busCompanyId, routeId, status }, { requestId }) {
        logger.info('Change route status', {
            requestId,
            routeId,
            status
        })

        const allowedStatus = ['ACTIVE', 'INACTIVE']
        if (!allowedStatus.includes(status)) {
            throw new BadRequestError('Invalid status')
        }

        const route = await RouteRepository.findById({
            busCompanyId,
            routeId
        })

        if (!route) {
            throw new NotFoundError('Route not found')
        }

        if (route.isDeleted) {
            throw new BadRequestError('Route has been deleted')
        }

        if (route.status === status) {
            return route
        }

        const updated = await RouteRepository.updateById({
            busCompanyId,
            routeId,
            payload: { status }
        })

        await redisCacheService.deleteCache({
            key: `route:detail:${busCompanyId}:${routeId}`
        })

        return updated
    }

    // activate
    async activateRoute(params, context) {
        return this.changeStatus(
            { ...params, status: 'ACTIVE' },
            context
        )
    }

    // deactivate
    async deactivateRoute(params, context) {
        return this.changeStatus(
            { ...params, status: 'INACTIVE' },
            context
        )
    }

    //delete
    async deleteRoute({busCompanyId, routeId}, {requestId}) {
        logger.warn('Delete route started', { requestId, routeId })

        await redisCacheService.deleteCache({
            key: `route:detail:${busCompanyId}:${routeId}`
        })

        const deleted = await RouteRepository.softDelete({
            busCompanyId,
            routeId
        })

        if (!deleted) {
            throw new NotFoundError({ message: 'Route not found' })
        }

        logger.info('Route deleted successfully', {
            requestId,
            routeId
        })

        return {}
    }


}

module.exports = {
    RouteService: new RouteService()
}