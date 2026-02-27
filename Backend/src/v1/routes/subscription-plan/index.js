const express = require('express')
const router = express.Router()
const { SubscriptionPlanController } = require('../../controllers/subscription.plan.controller')
const { asyncHandler } = require('../../helpers/handler/asyncHandler')
const { validateData } = require('../../middleware/validate.middleware')
const { createPlan, updatePlan, deletePlan } = require('../../validations/subscription.plan.validate')

router.post(
    '/create', 
    validateData(createPlan), 
    asyncHandler(SubscriptionPlanController.createPlan)
)

router.patch(
    '/update', 
    validateData(updatePlan), 
    asyncHandler(SubscriptionPlanController.updatePlan)
) 

router.delete(
    '/delete', 
    validateData(deletePlan), 
    asyncHandler(SubscriptionPlanController.deletePlan)
) 

module.exports = router;
