const router = require('express').Router()
const { BusCompanyController } = require('../../controllers/bus.company.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const { registration, subscribePlan, update, addBranch, quota } = require('../../validations/bus.company.validate')
const { validateData } = require('../../middleware/validate.middleware')
const { checkQuota } = require('../../middleware/quota.middleware')

router.post(
    '/register', 
    validateData(registration),
    asyncHandler(BusCompanyController.registerBusCompany)
);

router.post(
    '/add-branch/', 
    validateData(update),
    asyncHandler(BusCompanyController.addBranch)
);

router.patch(
    '/update-profile/',
    validateData(update),
    asyncHandler(BusCompanyController.updateProfile)
);

router.post(
    '/subscribe', 
    validateData(subscribePlan),
    asyncHandler(BusCompanyController.subscribePlan)
);

module.exports = router