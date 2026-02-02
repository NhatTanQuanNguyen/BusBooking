const { BusCompanyService } = require('../services/bus.company.service')
const busCompanyRepo = require('../models/repositories/bus.company.repo')
const { BadRequestError, ForbiddenError } = require('../core/error.response')

const quotaLimit = async (req, res, next) => {
    const company_id = req.params?.company_id || req.body?.company_id || req.query?.company_id

    if (!company_id) {
        throw new BadRequestError({ message: 'Missing company_id' })
    }

    const quotaStatus = await BusCompanyService.checkQuota({company_id})

    if (!quotaStatus.allowed) {
        throw new ForbiddenError({
            message: 'API quota exceeded'
        });
    }

    res.setHeader('X-Quota-Remaining', quotaStatus.remaining - 1)

    await busCompanyRepo.incrementMonthlyUsage(company_id)

    next();
};

module.exports = {
    quotaLimit
}