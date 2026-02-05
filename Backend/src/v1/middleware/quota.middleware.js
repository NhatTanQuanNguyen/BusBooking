const { BadRequestError } = require('../core/error.response')
const { BusCompanyService } = require('../services/bus.company.service')

const checkQuota = async (req, res, next) => {
	try {
		const requestId = req.requestId
		const company_id = req.params?.company_id || req.body?.company_id || req.query?.company_id

		if (!company_id) {
			throw new BadRequestError({ message: 'company_id is required' })
		}

		const quotaResult = await BusCompanyService.checkQuota({ company_id }, { requestId })

		req.quota = quotaResult
		next()
	} catch (error) {
		next(error)
	}
}

module.exports = {
	checkQuota
}
