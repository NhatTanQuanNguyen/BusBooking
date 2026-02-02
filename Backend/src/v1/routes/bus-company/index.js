const router = require('express').Router()
const { BusCompanyController } = require('../../controllers/bus.company.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')

router.post(
    '/register', 
    asyncHandler(BusCompanyController.registerBusCompany)
);

router.patch(
    '/update-profile/:company_id',
    asyncHandler(BusCompanyController.updateProfile)
);

router.post(
    '/subscribe', 
    asyncHandler(BusCompanyController.subscribePlan)
);

module.exports = router;