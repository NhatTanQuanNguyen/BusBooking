const { BadRequestError, NotFoundError } = require('../core/error.response')
const { logger } = require('../helpers/logger/myLogger')
const { getInfoData } = require('../utils/index')
const busCompanyRepo = require('../models/repositories/bus.company.repo')
const { SubscriptionPlanModel } = require('../models/subscription.plan.model')

class BusCompanyService {
    registerBusCompany = async ({brand_name, legal_entity, service_config, settings}) => {
        if (!brand_name || !service_config?.subdomain) {
            logger.warn('Missing required fields for bus company registration', { 
                brand_name, 
                service_config 
            })
            throw new BadRequestError({ message: 'Missing required fields' })
        }

        logger.info('Registering new bus company', { 
            brand_name 
        })

        const { subdomain } = service_config;
        const existed = await busCompanyRepo.findBySubdomain(subdomain);
        if (existed) {
            logger.warn('Subdomain already exists', { 
                subdomain 
            })

            throw new BadRequestError({ message: 'Subdomain already exists' });
        }   

        const newBusCompany = await busCompanyRepo.createBusCompany({
            brand_name,
            legal_entity,
            service_config,
            settings
        });

        if (!newBusCompany) {
            logger.error('Bus company registration failed', { 
                brand_name 
            })

            throw new BadRequestError({ message: 'Bus company registration failed' })
        }

        return {
            company: getInfoData(['_id', 'brand_name', 'service_config'], newBusCompany),
        }
    }

    subscribePlan = async ({ company_id, plan_name }) => {
        const plan = await SubscriptionPlanModel.findOne({ plan_name })
        if (!plan) {
            throw new NotFoundError({ message: 'Subscription plan not found' })
        }

        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + plan.duration_days)

        const updateData = {
            subscription: {
                plan_name: plan.plan_name,
                status: 'active',
                expires_at: expiresAt,
                quotas: {
                    ...plan.quotas,
                    current_month_usage: 0 
                }
            }
        }

        return await this.updateCompany({ 
            company_id, 
            payload: updateData 
        })
    }

    updateCompany = async ({ company_id, payload }) => {
        const existedCompany = await busCompanyRepo.findById(company_id);
        if (!existedCompany) {
            throw new NotFoundError({ message: 'Bus company not found' });
        }
        
        const updateData = getInfoData([
            'brand_name', 
            'legal_entity', 
            'service_config', 
            'subscription',
            'settings'
        ], payload)

        const updatedCompany = await busCompanyRepo.updateBusCompany({
            companyId: company_id,
            updateData
        })

        if (!updatedCompany) {
            throw new NotFoundError({ message: 'Bus company not found' })
        }
        
        return updatedCompany
    }

    checkQuota = async ({ company_id }) => {
        const company = await busCompanyRepo.findById(company_id)
        if (!company) {
            throw new NotFoundError({ message: 'Bus company not found' })
        }

        const { api_calls_per_month, current_month_usage } = company.subscription.quotas

        const remainingQuota = api_calls_per_month - current_month_usage
        if (remainingQuota <= 0) {
            throw new BadRequestError({ message: 'API call quota exceeded' })
        }

        return {
            allowed: remainingQuota > 0,
            remaining: Math.max(0, remainingQuota),
            limit: api_calls_per_month,
            usage: current_month_usage
        }
    }
}

module.exports = {
    BusCompanyService: new BusCompanyService()
}