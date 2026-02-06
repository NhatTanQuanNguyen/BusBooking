const LocationRepository = require('../models/repositories/location.repo')
const {BadRequestError, NotFoundError} = require('../core/error.response')
const { logger } = require('../helpers/logger/myLogger')

class LocationService {
    async createLocation({busCompanyId, payload}, {requestId}) {
        logger.info('Create location started', { requestId, busCompanyId })
        
        const existed = await LocationRepository.exists({
            busCompanyId,
            filter: {code: payload.code}
        })

        if (existed) {
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

        const location = await LocationRepository.findById({
            busCompanyId,
            locationId
        })

        if (!location) {
            throw new NotFoundError({ message: 'Location not found' })
        }

        logger.info('Location gotten successfully', {
            requestId,
            locationId
        })

        return location
    }

    async listLocations({ busCompanyId, filter = {}, limit, skip}, {requestId}) {

        const locations = await LocationRepository.findMany({
            busCompanyId,
            filter,
            limit,
            skip
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