const {RouteModel} = require('../route.model')
class RouteRepository {

    //create
    create = async ({busCompanyId, payload}) => {
        return await RouteModel.create({
            busCompanyId,
            ...payload
        })
    }

    //read
    findById = async ({busCompanyId, routeId}) => {
        return await RouteModel.findOne({
            _id: routeId,
            busCompanyId,
            isDeleted: false
        }).lean()
    }
    findOne = async ({busCompanyId, filter = {}}) => {
        return await RouteModel.findOne({
            busCompanyId,
            isDeleted: false,
            status: 'ACTIVE',
            ...filter
        }).lean()
    }
    findMany = async ({
        busCompanyId,
        filter = {}, 
        sort = {createdAt: -1},
        limit = 10,
        skip = 0
    }) => {
        return await RouteModel.find({
            busCompanyId,
            isDeleted: false,
            ...filter
        })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
    }
    exists = async ({busCompanyId, filter = {}}) => {
        return await RouteModel.exists({
            busCompanyId,
            isDeleted: false,
            ...filter
        })
    }

    //update
    updateById = async ({busCompanyId, routeId, payload}) => {
        const { code, busCompanyId: _, isDeleted, ...safePayload } = payload

        return await RouteModel.findOneAndUpdate(
            {
                _id: routeId,
                busCompanyId,
                isDeleted: false
            },
            safePayload,
            {new: true}
        ).lean()
    }

    //delete
    softDelete = async ({ busCompanyId, routeId }) => {
        return await RouteModel.findOneAndUpdate(
        {
            _id: routeId,
            busCompanyId,
            isDeleted: false
        },
        {
            isDeleted: true,
            status: 'INACTIVE'
        },
        { new: true }
        ).lean()
    }
}

module.exports = new RouteRepository()