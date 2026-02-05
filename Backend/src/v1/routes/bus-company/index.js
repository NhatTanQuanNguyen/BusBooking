const router = require('express').Router()
const { BusCompanyController } = require('../../controllers/bus.company.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const { registration,subscribePlan,update,quota } = require('../../validations/bus.company.validate')
const { validateData } = require('../../middleware/validate.middleware')
const { checkQuota } = require('../../middleware/quota.middleware')

router.post(
    '/register', 
    validateData(registration),
    asyncHandler(BusCompanyController.registerBusCompany)
);

router.patch(
    '/update-profile/:company_id',
    validateData(update, 'params'),
    asyncHandler(BusCompanyController.updateProfile)
);

router.post(
    '/subscribe', 
    validateData(subscribePlan),
    asyncHandler(BusCompanyController.subscribePlan)
);

module.exports = router