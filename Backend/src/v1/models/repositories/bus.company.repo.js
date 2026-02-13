const { BusCompanyModel } = require('../bus.company.model');

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

    async findById(id) {
        return await BusCompanyModel.findById(id).lean();
    }

    async findByTaxCode(tax_code) {
        return await BusCompanyModel.findOne({ 'legal_entity.tax_code': tax_code }).lean();
    }

    async incrementMonthlyUsage(companyId) {
        return await BusCompanyModel.findByIdAndUpdate(companyId, {
            $inc: { "subscription.quotas.current_month_usage": 1 }
        }).lean();
    }
}

module.exports = new BusCompanyRepository();