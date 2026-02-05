const { BusCompanyModel } = require('../bus.company.model');

class BusCompanyRepository {
    async createBusCompany({brand_name, legal_entity}) {
        return await BusCompanyModel.create({
            brand_name,
            legal_entity
        });
    }

    async updateBusCompany({ companyId, updateData }) {
        const setData = { ...updateData }
        if (setData.legal_entity && typeof setData.legal_entity === 'object') {
            const legalEntity = setData.legal_entity
            delete setData.legal_entity

            Object.keys(legalEntity).forEach((key) => {
                if (legalEntity[key] !== undefined) {
                    setData[`legal_entity.${key}`] = legalEntity[key]
                }
            })
        }

        return await BusCompanyModel.findByIdAndUpdate(
            companyId,
            { 
                $set: setData 
            },
            { 
                new: true,           
                runValidators: true,  
                context: 'query' 
            }
        ).lean();
    }

    async findById(id) {
        return await BusCompanyModel.findById(id).lean();
    }

    async findByBrandName(brand_name) {
        return await BusCompanyModel.findOne({ brand_name }).lean();
    }


    async incrementMonthlyUsage(companyId) {
        return await BusCompanyModel.findByIdAndUpdate(companyId, {
            $inc: { "subscription.quotas.current_month_usage": 1 }
        }).lean();
    }
}

module.exports = new BusCompanyRepository();