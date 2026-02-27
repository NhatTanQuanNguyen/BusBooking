const router = require('express').Router()
const { BusCompanyController } = require('../../controllers/bus.company.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const { registration, subscribePlan, update, addBranch, deleteBranch, updateBranch, quota } = require('../../validations/bus.company.validate')
const { validateData } = require('../../middleware/validate.middleware')
const { checkQuota } = require('../../middleware/quota.middleware')

router.post(
    '/register', 
    validateData(registration),
    asyncHandler(BusCompanyController.registerBusCompany)   
)

router.post(
    '/add-branch/', 
    validateData(addBranch),
    asyncHandler(BusCompanyController.addBranch)
)

router.delete(
    '/delete-branch/', 
    validateData(deleteBranch),
    asyncHandler(BusCompanyController.deleteBranch)
)

router.patch(
    '/update-profile/',
    validateData(update),
    asyncHandler(BusCompanyController.updateProfile)
)

router.patch(
    '/update-branch/',
    validateData(updateBranch),
    asyncHandler(BusCompanyController.updateBranch)
)

router.post(
    '/subscribe', 
    validateData(subscribePlan),
    asyncHandler(BusCompanyController.subscribePlan)
)

router.get(
    '/:company_id',
    validateData(quota),
    asyncHandler(BusCompanyController.getById)
)

router.get(
    '/',
    asyncHandler(BusCompanyController.getList)
)

module.exports = router