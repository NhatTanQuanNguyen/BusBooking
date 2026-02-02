const {LocationModel} = require('../location.model')

class LocationRepository {
    create = async ({ busCompanyId, payload }) => {
        return LocationModel.create({
        busCompanyId,
        ...payload
        })
    }

    findMany = async ({ busCompanyId, filter = {}, limit, skip }) => {
        return LocationModel.find({
        busCompanyId,
        isDeleted: false,
        status: 'ACTIVE',
        ...filter
        })
        .limit(limit)
        .skip(skip)
        .lean()
    }

    findById = async ({busCompanyId, locationId}) => {
        return await LocationModel.findOne({
            _id: locationId,
            busCompanyId,
            isDeleted: false
        }).lean()
    }

    exists = async ({busCompanyId, filter = {}}) => {
        return await LocationModel.exists({
            busCompanyId,
            isDeleted: false,
            ...filter
        })
    }


    updateById = async ({busCompanyId, locationId, payload}) => {
        return await LocationModel.findOneAndUpdate(
            {_id: locationId, busCompanyId, isDeleted: false},
            {$set: payload},
            {new: true}
        ).lean()
    }

    softDelete = async ({busCompanyId, locationId}) => {
        return await LocationModel.findOneAndUpdate(
            {_id: locationId, busCompanyId, isDeleted: false},
            {$set: {
                isDeleted: true,
                status: 'INACTIVE'
            }},
            {new: true}
        ).lean()
    }
}

module.exports = new LocationRepository()