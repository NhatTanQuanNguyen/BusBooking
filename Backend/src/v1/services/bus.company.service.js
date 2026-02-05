const { BadRequestError, NotFoundError } = require('../core/error.response')
const { logger } = require('../helpers/logger/myLogger')
const { getInfoData } = require('../utils/index')
const busCompanyRepo = require('../models/repositories/bus.company.repo')
const { SubscriptionPlanModel } = require('../models/subscription.plan.model')
const { redisCacheService } = require('./cache.service')

class BusCompanyService {
    registerBusCompany = async ({ brand_name, legal_entity }, { requestId }) => {
        logger.info('Bus company register start', { brand_name, requestId }) 

        const existed = await busCompanyRepo.findByBrandName(brand_name);
        if (existed) {
            throw new BadRequestError({ message: 'Bus company already exists' });
        }

        const newBusCompany = await busCompanyRepo.createBusCompany({
            brand_name,
            legal_entity
        });

        return {
            company: getInfoData(['_id', 'brand_name'], newBusCompany),
        }
    }

    subscribePlan = async ({ company_id, plan_name }, { requestId }) => {
        logger.info('Bus company subscribe start', { company_id, plan_name, requestId })

        const plan = await SubscriptionPlanModel.findOne({ plan_name })
        if (!plan) {
            throw new NotFoundError({ message: 'Subscription plan not found' })
        }

        logger.info('Subscription plan found', { plan_name, requestId })

        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + plan.duration_days)

        const updateData = {
            subscription: {
                plan_name: plan.plan_name,
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
        }, { requestId })
    }

    updateCompany = async ({ company_id, payload }, { requestId }) => {
        logger.info('Bus company update start', { company_id, requestId })

        const existedCompany = await busCompanyRepo.findById(company_id)

        if (!existedCompany) {
            throw new NotFoundError({ message: 'Bus company not found' })
        }

        logger.info('Bus company found', { company_id, requestId })
        
        const updateData = getInfoData([
            'brand_name', 
            'legal_entity', 
            'subscription'
        ], payload)

        const updatedCompany = await busCompanyRepo.updateBusCompany({
            companyId: company_id,
            updateData
        })

        if (!updatedCompany) {
            throw new NotFoundError({ message: 'Bus company not found' })
        }
        
        logger.info('Bus company update done', { company_id, requestId })

        return updatedCompany
    }

    checkQuota = async ({ company_id }, { requestId }) => {
        logger.info('Bus company quota check', { company_id, requestId })

        const cacheKey = `company:quota:${company_id}`
        let quota = await redisCacheService.getCache({ key: cacheKey })

        if (!quota) {
            const company = await busCompanyRepo.findById(company_id)
            if (!company) throw new NotFoundError({ message: 'Bus company not found' })

            const { subscription } = company
            if (!subscription?.quotas) {
                throw new BadRequestError({ message: 'Subscription plan not found for company' })
            }

            quota = {
                expires_at: subscription.expires_at,
                api_calls_per_month: subscription.quotas.api_calls_per_month,
                current_month_usage: subscription.quotas.current_month_usage || 0
            }

            await redisCacheService.setCacheTTL({
                key: cacheKey,
                value: quota,
                ttl: 60
            })
        }

        if (quota.expires_at && new Date(quota.expires_at) <= new Date()) {
            throw new BadRequestError({ message: 'Subscription plan expired' })
        }

        const limit = quota.api_calls_per_month 
        const used = quota.current_month_usage

        if (!limit || used >= limit) {
            throw new BadRequestError({ message: 'Quota exceeded' })
        }

        const updatedUsage = used + 1
        await busCompanyRepo.incrementMonthlyUsage(company_id)

        await redisCacheService.setCacheTTL({
            key: cacheKey,
            value: { ...quota, current_month_usage: updatedUsage },
            ttl: 60
        })

        return {
            allowed: true,
            limit,
            used: updatedUsage,
            remaining: limit - updatedUsage,
            expires_at: quota.expires_at
        }
    }
}

module.exports = {
    BusCompanyService: new BusCompanyService()
}