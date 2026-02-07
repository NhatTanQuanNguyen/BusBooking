const LocationRepository = require('../models/repositories/location.repo')
const {BadRequestError, NotFoundError} = require('../core/error.response')
const { logger } = require('../helpers/logger/myLogger')

class LocationService {
    async createLocation({busCompanyId, payload}, {requestId}) {
        logger.info('Create location started', { requestId, busCompanyId })

        if (!payload) {
            throw new BadRequestError('Payload is required')
        }

        if (!payload.code || !payload.code.trim()) {
            throw new BadRequestError('Location code is required')
        }
        
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

    //list active
    async listActiveLocations({ busCompanyId, limit, skip }, { requestId }) {
        const locations = await LocationRepository.findMany({
            busCompanyId,
            filter: {
                status: 'ACTIVE'
            },
            limit,
            skip
        })

        logger.info('Active locations found', {
            requestId,
            total: locations.length
        })

        return locations
    }

    //list inactive
    async listInactiveLocations({ busCompanyId, limit, skip }, { requestId }) {
        const locations = await LocationRepository.findMany({
            busCompanyId,
            filter: {
                status: 'INACTIVE'
            },
            limit,
            skip
        })

        logger.info('Inactive locations found', {
            requestId,
            total: locations.length
        })

        return locations
    }

    async updateLocation({busCompanyId, locationId, payload}, {requestId}) {
        logger.info('Update location started', { requestId, locationId })

        const location = await LocationRepository.findById({ busCompanyId, locationId })
        if (!location) {
            throw new NotFoundError('Location not found')
        }

        if (!payload || Object.keys(payload).length === 0) {
            throw new BadRequestError('Update payload is empty')
        }

        if (location.status === 'INACTIVE') {
            throw new BadRequestError('Cannot update inactive location')
        }

        const updateData = { ...payload }

        delete updateData.busCompanyId
        delete updateData.isDeleted
        delete updateData._id
        delete updateData.createdAt
        delete updateData.status

        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key]
            }
        })

        if (Object.keys(updateData).length === 0) {
            throw new BadRequestError('No valid fields to update')
        }

        if (updateData.code && updateData.code !== location.code) {
            const existed = await LocationRepository.exists({
                busCompanyId,
                filter: {
                    code: updateData.code,
                    _id: { $ne: locationId }
                }
            })

            if (existed) {
                throw new BadRequestError('Location code already exists')
            }
        }

        const updated = await LocationRepository.updateById({
            busCompanyId,
            locationId,
            payload: updateData
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

    //change status
    async changeStatus({ busCompanyId, locationId, status }, { requestId }) {
        logger.info('Change location status', {
            requestId,
            locationId,
            status
        })

        const allowedStatus = ['ACTIVE', 'INACTIVE']
        if (!allowedStatus.includes(status)) {
            throw new BadRequestError('Invalid status')
        }

        const location = await LocationRepository.findById({
            busCompanyId,
            locationId
        })

        if (!location) {
            throw new NotFoundError('Location not found')
        }

        if (location.isDeleted) {
            throw new BadRequestError('Location has been deleted')
        }

        if (location.status === status) {
            return location
        }

        const updated = await LocationRepository.updateById({
            busCompanyId,
            locationId,
            payload: { status }
        })

        if (!updated) {
            throw new NotFoundError({ message: 'Location not found' })
        }

        return updated
    }

    //active
    async activateLocation(params, context) {
        return this.changeStatus(
            { ...params, status: 'ACTIVE' },
            context
        )
    }

    //deactive
    async deactivateLocation(params, context) {
        return this.changeStatus(
            { ...params, status: 'INACTIVE' },
            context
        )
    }

    //delete
    async deleteLocation({ busCompanyId, locationId }, { requestId }) {
        logger.warn('Delete location (soft)', {
            requestId,
            locationId
        })

        const location = await LocationRepository.findById({
            busCompanyId,
            locationId
        })

        if (!location) {
            throw new NotFoundError('Location not found')
        }

        if (location.isDeleted) {
            throw new BadRequestError('Location already deleted')
        }

        const updated = await LocationRepository.updateById({
            busCompanyId,
            locationId,
            payload: {
                status: 'INACTIVE',
                isDeleted: true
            }
        })

        if (!updated) {
            throw new NotFoundError('Location not found')
        }

        return {}
    }

}

module.exports = {
    LocationService: new LocationService()
}