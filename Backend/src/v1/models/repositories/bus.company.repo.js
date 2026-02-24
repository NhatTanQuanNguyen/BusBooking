const { BusCompanyModel } = require('../bus.company.model')

class BusCompanyRepository {
    async createBusCompany({brand_name, legal_entity, branches}) {
        return await BusCompanyModel.create({
            brand_name,
            legal_entity,
            branches
        });
    }

    async updateBusCompany({ companyId, updateData }) {
        const setData = { ...updateData }
        const flattenNested = (field) => {
            if (setData[field] && typeof setData[field] === 'object') {
                const nested = setData[field]
                delete setData[field]

                Object.keys(nested).forEach((key) => {
                    if (nested[key] !== undefined) {
                        setData[`${field}.${key}`] = nested[key]
                    }
                })
            }
        }

        flattenNested('legal_entity')

        return await BusCompanyModel.findByIdAndUpdate(
            companyId,
            { $set: setData },
            { new: true }
        ).lean();
    }

    async addBranchesToCompany({ company_id, branches }) {
        return await BusCompanyModel.findByIdAndUpdate(
            company_id,
            { $push: { branches: { $each: branches } } },
            { new: true }
        ).lean();
    }
    
    async updateBranch({ company_id, branch_id, update_data }) {
        const setQuery = {}
        if (update_data.name !== undefined) {
            setQuery['branches.$.name'] = update_data.name
        }
        if (update_data.address !== undefined) {
            setQuery['branches.$.address'] = update_data.address
        }

        if (Object.keys(setQuery).length === 0) {
            return null
        }

        return await BusCompanyModel.findOneAndUpdate(
            { 
                _id: company_id, 
                "branches._id": branch_id 
            },
            { $set: setQuery },
            { new: true } 
        ).lean();
    }

    async softDeleteBranch({ company_id, branch_id }) {
        return await BusCompanyModel.findOneAndUpdate(
            { 
                _id: company_id, 
                "branches._id": branch_id
            },
            { 
                $set: { "branches.$.isDeleted": true } 
            },
            { new: true }
        ).lean();
    }

    async findById(id) {
        return await BusCompanyModel.findById(id).lean();
    }

    async findByTaxCode(tax_code) {
        return await BusCompanyModel.findOne({ 'legal_entity.tax_code': tax_code }).lean();
    }

    async incrementMonthlyUsage(company_id) {
        return await BusCompanyModel.findByIdAndUpdate(company_id, {
            $inc: { "subscription.quotas.current_month_usage": 1 }
        }).lean();
    }

    async updateSubscription({ company_id, subscription }) {
        const updateData = {};
        Object.keys(subscription).forEach((key) => {
            updateData[`subscription.${key}`] = subscription[key];
        });

        return await BusCompanyModel.findByIdAndUpdate(
            company_id,
            { $set: updateData },
            { new: true }
        ).lean();
    }

    async findAll({ skip = 0, limit = 10 }) {
        return await BusCompanyModel.find()
            .skip(skip)
            .limit(limit)
            .lean();
    }

    async countTotal() {
        return await BusCompanyModel.countDocuments();
    }
}

module.exports = new BusCompanyRepository();