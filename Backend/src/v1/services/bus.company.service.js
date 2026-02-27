const { BadRequestError, NotFoundError } = require('../core/error.response')
const { logger } = require('../helpers/logger/myLogger')
const { getInfoData } = require('../utils/index')
const busCompanyRepo = require('../models/repositories/bus.company.repo')
const { SubscriptionPlanModel } = require('../models/subscription.plan.model')
const { redisCacheService } = require('./cache.service')

class BusCompanyService {
    registerBusCompany = async ({ brand_name, legal_entity, branches }, { requestId }) => {
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

        if (branches && Array.isArray(branches) && branches.length > 0) {
            busCompanyData.branches = branches.map(branch => ({
                name: branch.name,
                address: branch.address,
            }))
        }

        const newBusCompany = await busCompanyRepo.createBusCompany(busCompanyData)

        return {
            company: getInfoData(['_id', 'brand_name', 'legal_entity', 'branches'], newBusCompany),
        }
    }

    addBranch = async ({ company_id, branches}, { requestId }) => {
        if (!branches || !Array.isArray(branches) || branches.length === 0) {
            throw new BadRequestError({ message: 'Branches is required and must be a non-empty array' })
        }

        logger.info('Bus company add branch start', { company_id, requestId })

        const company = await busCompanyRepo.findById(company_id)
        if (!company) {
            throw new NotFoundError({ message: 'Bus company not found' })
        }

        const existingNames = new Set(company.branches.map(b => b.name))
        const newBranchNames = new Set()

        for (const branch of branches) {
            if (existingNames.has(branch.name)) {
                throw new BadRequestError({ message: `Branch "${branch.name}" already exists` })
            }
            if (newBranchNames.has(branch.name)) {
                throw new BadRequestError({ message: `Duplicate branch name "${branch.name}" in request` })
            }
            newBranchNames.add(branch.name)
        }

        const updatedCompany = await busCompanyRepo.addBranchesToCompany({
            company_id,
            branches
        })

        logger.info('Bus company add branch done', { company_id, requestId })

        return updatedCompany
    }

    deleteBranch = async ({ company_id, branch_id }, { requestId }) => {
        logger.info('Bus company soft delete branch start', { company_id, branch_id, requestId })

        const company = await busCompanyRepo.findById(company_id)
        if (!company) {
            throw new NotFoundError({ message: 'Bus company not found' })
        }

        const branch = company.branches.find(b => b._id.toString() === branch_id)
        if (!branch) {
            throw new NotFoundError({ message: 'Branch not found' })
        }

        if (branch.isDeleted) {
            throw new BadRequestError({ message: 'Branch is already deleted' })
        }

        const updatedCompany = await busCompanyRepo.softDeleteBranch({ 
            company_id, 
            branch_id 
        })

        if (!updatedCompany) {
            throw new BadRequestError({ message: 'Failed to delete branch' })
        }

        logger.info('Bus company soft delete branch done', { company_id, branch_id, requestId })

        return updatedCompany
    }

    updateBranch = async ({ company_id, branch_id, update_data }, { requestId }) => {
        logger.info('Bus company update branch start', { company_id, branch_id, requestId })

        const company = await busCompanyRepo.findById(company_id)
        if (!company) {
            throw new NotFoundError({ message: 'Bus company not found' })
        }

        const branch = company.branches.find(b => b._id.toString() === branch_id)
        if (!branch) {
            throw new NotFoundError({ message: 'Branch not found' })
        }

        if (branch.isDeleted) {
            throw new BadRequestError({ message: 'Cannot update a deleted branch' })
        }

        if (update_data.name) {
            const nameExists = company.branches.some(b => 
                !b.isDeleted && 
                b.name === update_data.name && 
                b._id.toString() !== branch_id
            )
            if (nameExists) {
                throw new BadRequestError({ message: 'Branch name already exists' })
            }
        }
        
        const updatedCompany = await busCompanyRepo.updateBranch({
            company_id,
            branch_id,
            update_data
        })

        logger.info('Update branch result', { company_id, branch_id, result: updatedCompany, requestId })

        if (!updatedCompany) {
            throw new BadRequestError({ message: 'Failed to update branch' })
        }

        logger.info('Bus company update branch done', { company_id, branch_id, requestId })
        return updatedCompany
    }

    subscribePlan = async ({ company_id, plan_name }, { requestId }) => {
        logger.info('Bus company subscribe start', { company_id, plan_name, requestId })

        const company = await busCompanyRepo.findById(company_id)
        if (!company) {
            throw new NotFoundError({ message: 'Bus company not found' })
        }

        const normalizedPlanName = plan_name.trim().toLowerCase()

        const plan = await SubscriptionPlanModel.findOne({ plan_name: normalizedPlanName }).lean()
        if (!plan) {
            throw new NotFoundError({ message: 'Subscription plan not found' })
        }

        logger.info('Subscription plan found', { normalizedPlanName, requestId })

        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + plan.duration_days)

        const subscriptionData = {
            plan_name: normalizedPlanName,
            expires_at: expiresAt,
            quotas: {
                ...plan.quotas,
                current_month_usage: 0 
            }
        }

        const updatedCompany = await busCompanyRepo.updateSubscription({
            company_id,
            subscription: subscriptionData
        })

        logger.info('Bus company subscribe done', { company_id, requestId })

        return updatedCompany
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
        }

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

    getById = async ({ company_id }, { requestId }) => {
        logger.info('Bus company get by ID start', { company_id, requestId })

        const company = await busCompanyRepo.findById(company_id)
        if (!company) {
            throw new NotFoundError({ message: 'Bus company not found' })
        }

        logger.info('Bus company found', { company_id, requestId })

        return company
    }

    getList = async ({ skip = 0, limit = 10 }, { requestId }) => {
        logger.info('Bus company get list start', { skip, limit, requestId })

        const companies = await busCompanyRepo.findAll({ skip, limit })
        const total = await busCompanyRepo.countTotal()

        logger.info('Bus company list retrieved', { count: companies.length, total, requestId })

        return {
            data: companies,
            pagination: {
                total,
                skip,
                limit,
                page: Math.floor(skip / limit) + 1
            }
        }
    }
}

module.exports = {
    BusCompanyService: new BusCompanyService()
}