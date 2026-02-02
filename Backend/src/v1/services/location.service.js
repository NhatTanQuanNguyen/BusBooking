const LocationRepository = require('../models/repositories/location.repo')
const {BadRequestError, NotFoundError} = require('../core/error.response')
const { logger } = require('../helpers/logger/myLogger')
const { redisCacheService } = require('./cache.service')

class LocationService {
    async createLocation({busCompanyId, payload}, {requestId}) {
        logger.info('Create location started', { requestId, busCompanyId })
        const {
            code,
            name,
            type
        } = payload

        if (!code || !name || !type) {
            throw new BadRequestError({ message: 'Missing required fields' })
        }

        const codeCacheKey = `location:code:${busCompanyId}:${code}`
        const cached = await redisCacheService.getCache({key: codeCacheKey})
        if (cached) {
            throw new BadRequestError({ message: 'Location code already exists' })
        }

        const existed = await LocationRepository.exists({
            busCompanyId,
            filter: {code}
        })

        if (existed) {
            await redisCacheService.setCacheTTL({
                key: codeCacheKey,
                value: true,
                ttl: 60
            })
            throw new BadRequestError({ message: 'Location code already exists' })
        }
        const location = await LocationRepository.create({
            busCompanyId,
            payload
        })
        
        logger.info('Location created successfully', {
            requestId,
            locationId: location._id
        })

        return location
    }

    async getLocationById({busCompanyId, locationId}, {requestId}) {
        const cacheKey = `location:detail:${busCompanyId}:${locationId}`

        const cached = await redisCacheService.getCache({key: cacheKey})
        if (cached) {
            logger.info('Location loaded from cache', { requestId, locationId })
            return cached
        }

        const location = await LocationRepository.findById({
            busCompanyId,
            locationId
        })

        if (!location) {
            throw new NotFoundError({ message: 'Location not found' })
        }

        await redisCacheService.setCache({
            key: cacheKey,
            value: location
        })

        logger.info('Location gotten successfully', {
            requestId,
            locationId
        })

        return location
    }

    async listLocations({ busCompanyId, filter = {}, limit, skip}, {requestId}) {
        const listCacheKey = `location:list:${busCompanyId}:${JSON.stringify({
            filter,
            limit,
            skip
        })}`

        const cached = await redisCacheService.getCache({ key: listCacheKey })
        if (cached) return cached

        const locations = await LocationRepository.findMany({
            busCompanyId,
            filter,
            limit,
            skip
        })

        await redisCacheService.setCacheTTL({
            key: listCacheKey,
            value: locations,
            ttl: 30
        })

        logger.info('Locations found successfully', {
            requestId,
            total: locations.length
        })

        return locations
    }

    async updateLocation({busCompanyId, locationId, payload}, {requestId}) {
        logger.info('Update location started', { requestId, locationId })

        const updated = await LocationRepository.updateById({
            busCompanyId,
            locationId,
            payload
        })

        if (!updated) {
            throw new NotFoundError({ message: 'Location not found' })
        }

        await redisCacheService.deleteCache({
            key: `location:detail:${busCompanyId}:${locationId}`
        })

        logger.info('Location updated successfully', {
            requestId,
            locationId
        })

        return updated
    }

    async deleteLocation({busCompanyId, locationId}, {requestId}) {
        logger.warn('Delete location started', { requestId, locationId })

        const deleted = await LocationRepository.softDelete({
            busCompanyId,
            locationId
        })

        if (!deleted) {
            throw new NotFoundError({ message: 'Location not found' })
        }

        await redisCacheService.deleteCache({
            key: `location:detail:${busCompanyId}:${locationId}`
        })

        logger.info('Location deleted successfully', {
            requestId,
            locationId
        })

        return {}
    }
}

module.exports = {
    LocationService: new LocationService()
}