const { BadRequestError, NotFoundError } = require('../core/error.response')
const { logger } = require('../helpers/logger/myLogger')
const { getInfoData } = require('../utils/index')
const busCompanyRepo = require('../models/repositories/bus.company.repo')
const { SubscriptionPlanModel } = require('../models/subscription.plan.model')
const { redisCacheService } = require('./cache.service')

class BusCompanyService {
    registerBusCompany = async ({ brand_name, legal_entity, branch }, { requestId }) => {
        logger.info('Bus company register start', { brand_name, requestId }) 

        const existed = await busCompanyRepo.findByTaxCode(legal_entity.tax_code)
        if (existed) {
            throw new BadRequestError({ message: 'Bus company with this tax code already exists' })
        }

        const busCompanyData = {
            brand_name,
            legal_entity,
            branches: []
        }

        if (branch) {
            busCompanyData.branches.push({
                name: branch.name,
                address: branch.address,
            })
        }

        const newBusCompany = await busCompanyRepo.createBusCompany(busCompanyData)

        return {
            company: getInfoData(['_id', 'brand_name', 'legal_entity', 'branches'], newBusCompany),
        }
    }

    addBranch = async ({ company_id, branch}, { requestId }) => {
        logger.info('Bus company add branch start', { company_id, requestId })

        const company = await busCompanyRepo.findById(company_id)
        if (!company) {
            throw new NotFoundError({ message: 'Bus company not found' })
        }

        const existed = company.branches.find(b => b.name === branch.name)
        if (existed) {
            throw new BadRequestError({ message: 'Branch already exists' })
        }

        const updatedBranches = [
            ...(company.branches || []), 
            branch
        ]

        return await this.updateCompany({ 
            company_id, 
            payload: { branches: updatedBranches } 
        }, { requestId })
    }

    subscribePlan = async ({ company_id, plan_name }, { requestId }) => {
        logger.info('Bus company subscribe start', { company_id, plan_name, requestId })

        const normalizedPlanName = plan_name.trim().toLowerCase()

        const plan = await SubscriptionPlanModel.findOne({ plan_name: normalizedPlanName }).lean()
        if (!plan) {
            throw new NotFoundError({ message: 'Subscription plan not found' })
        }

        logger.info('Subscription plan found', { normalizedPlanName, requestId })

        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + plan.duration_days)

        const updateData = {
            subscription: {
                plan_name: normalizedPlanName,
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

        const updateData = {
            ...(payload.brand_name !== undefined && { brand_name: payload.brand_name }),
            ...(payload.legal_entity !== undefined && { legal_entity: payload.legal_entity }),
            ...(payload.branches !== undefined && { branches: payload.branches }),
            ...(payload.subscription !== undefined && { subscription: payload.subscription }),
        };

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