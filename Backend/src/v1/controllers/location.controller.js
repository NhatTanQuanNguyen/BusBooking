const { LocationService } = require('../services/location.service')
const { OK } = require('../core/success.response')

class LocationController {

    // POST /locations
    createLocation = async (req, res, next) => {
        const { busCompanyId, requestId } = req

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
        const { busCompanyId, requestId } = req

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
    listActiveLocations = async (req, res, next) => {
        const { busCompanyId, requestId } = req
        const { limit = 10, skip = 0 } = req.query

        const locations = await LocationService.listActiveLocations({
            busCompanyId,
            limit,
            skip
        }, { requestId })

        return new OK({
            message: 'Active location list',
            data: locations
        }).send(res)
    }

    listInactiveLocations = async (req, res, next) => {
        const { busCompanyId, requestId } = req
        const { limit = 10, skip = 0 } = req.query

        const locations = await LocationService.listInactiveLocations({
            busCompanyId,
            limit,
            skip
        }, { requestId })

        return new OK({
            message: 'Inactive location list',
            data: locations
        }).send(res)
    }


    // PATCH /locations/:id
    updateLocation = async (req, res, next) => {
        const { busCompanyId, requestId } = req

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
        const { busCompanyId, requestId } = req

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

    activateLocation = async (req, res, next) => {
        const { busCompanyId, requestId } = req
        const location = await LocationService.activateLocation(
            {
                busCompanyId,
                locationId: req.params.id
            },
            { requestId }
        )

        return new OK({
            message: 'Location activated',
            data: location
        }).send(res)
    }

    deactivateLocation = async (req, res, next) => {
        const { busCompanyId, requestId } = req
        const location = await LocationService.deactivateLocation(
            {
                busCompanyId,
                locationId: req.params.id
            },
            { requestId }
        )

        return new OK({
            message: 'Location deactivated',
            data: location
        }).send(res)
    }

}

module.exports = {
    LocationController: new LocationController()
}