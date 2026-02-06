const RouteRepository = require('../models/repositories/route.repo')
const {BadRequestError, NotFoundError} = require('../core/error.response')
const { logger } = require('../helpers/logger/myLogger')
const { redisCacheService } = require('./cache.service')

class RouteService {
    
    //create
    async createRoute({busCompanyId, payload},  {requestId}) {
        logger.info('Create route started', { requestId, busCompanyId })
        const {
            originId,
            destinationId,
            code,
            minTime,
            maxTime
        } = payload

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
    async listRoutes({busCompanyId, filter={}, limit, skip}, {requestId}) {
        const listCacheKey = `route:list:${busCompanyId}:${JSON.stringify({filter, limit, skip})}`
        const cached = await redisCacheService.getCache({key: listCacheKey})
        if (cached) return cached

        const routes = await RouteRepository.findMany({
            busCompanyId,
            filter,
            limit,
            skip
        })

        await redisCacheService.setCacheTTL({
            key: listCacheKey,
            value: routes,
            ttl: 180
        })

        logger.info('Route found successfully', {
            requestId,
            total: routes.length
        })

        return routes
    }
    
    //update
    async updateRoute({busCompanyId, routeId, payload}, {requestId}) {
        logger.info('Update route started', { requestId, routeId })

        const updated = await RouteRepository.updateById({
            busCompanyId,
            routeId,
            payload
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