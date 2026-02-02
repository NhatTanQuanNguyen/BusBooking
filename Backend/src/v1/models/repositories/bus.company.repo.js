const { BusCompanyModel } = require('../bus.company.model');

class BusCompanyRepository {
    async createBusCompany({brand_name, legal_entity, service_config, subscription, settings}) {
        return await BusCompanyModel.create({
            brand_name,
            legal_entity,
            service_config,
            subscription,
            settings
        });
    }

    async updateBusCompany({ companyId, updateData }) {
        return await BusCompanyModel.findByIdAndUpdate(
            companyId,
            { 
                $set: updateData 
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

    async findBySubdomain(subdomain) {
        return await BusCompanyModel.findOne({ 
            "service_config.subdomain": subdomain 
        }).lean();
    }

    async incrementMonthlyUsage(companyId) {
        return await BusCompanyModel.findByIdAndUpdate(companyId, {
            $inc: { "subscription.quotas.current_month_usage": 1 }
        }).lean();
    }
}

module.exports = new BusCompanyRepository();