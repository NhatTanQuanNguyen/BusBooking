const { LocationService } = require('../services/location.service')
const { OK } = require('../core/success.response')

class LocationController {

    // POST /locations
    createLocation = async (req, res, next) => {
        const busCompanyId = req.busCompanyId
        const requestId = req.requestId

        const location = await LocationService.createLocation(
            {
                busCompanyId,
                payload: req.body
            },
            { requestId }
        )

        return new OK({
            message: 'Location created successfully',
            data: location
        }).send(res)
    }

    // GET /locations/:id
    getLocationById = async (req, res, next) => {
        const busCompanyId = req.busCompanyId
        const requestId = req.requestId

        const location = await LocationService.getLocationById(
            {
                busCompanyId,
                locationId: req.params.id
            },
            { requestId }
        )

        return new OK({
            message: 'Location detail',
            data: location
        }).send(res)
    }

    // GET /locations
    listLocations = async (req, res, next) => {
        const {
            limit = 10,
            skip = 0,
            type,
            status
        } = req.query

        const filter = {}
        if (type) filter.type = type
        if (status) filter.status = status

        const busCompanyId = req.busCompanyId
        const requestId = req.requestId

        const locations = await LocationService.listLocations(
            {
                busCompanyId,
                filter,
                limit: Number(limit),
                skip: Number(skip)
            },
            { requestId }
        )

        return new OK({
            message: 'Location list',
            data: locations,
            meta: {
                limit: Number(limit),
                skip: Number(skip),
                count: locations.length
            }
        }).send(res)
    }

    // PUT /locations/:id
    updateLocation = async (req, res, next) => {
        const busCompanyId = req.busCompanyId
        const requestId = req.requestId

        const location = await LocationService.updateLocation(
            {
                busCompanyId,
                locationId: req.params.id,
                payload: req.body
            },
            { requestId }
        )

        return new OK({
            message: 'Location updated successfully',
            data: location
        }).send(res)
    }

    // DELETE /locations/:id
    deleteLocation = async (req, res, next) => {
        const busCompanyId = req.busCompanyId
        const requestId = req.requestId

        await LocationService.deleteLocation(
            {
                busCompanyId,
                locationId: req.params.id
            },
            { requestId }
        )

        return new OK({
            message: 'Location deleted successfully'
        }).send(res)
    }
}

module.exports = {
    LocationController: new LocationController()
}