const { logger } = require('../helpers/logger/myLogger')
const { SubscriptionPlanService } = require('../services/subscription.plan.service')
const { OK } = require("../core/success.response")

class SubscriptionPlanController {
    createPlan = async(req, res, next) => {
        const requestId = req.requestId
        logger.info('Subscription plan creation start', { 
            requestId, 
            body: req.body 
        })

        const data = await SubscriptionPlanService.createPlan(req.body, { requestId })

        logger.info('Subscription plan creation done', { requestId })

        return new OK({
            message: 'Subscription plan created successfully',
            data
        }).send(res);
    }

    updatePlan = async(req, res, next) => {
        const requestId = req.requestId
        const { plan_name, ...payload } = req.body  

        logger.info('Subscription plan update start', { requestId, plan_name })

        const data = await SubscriptionPlanService.updatePlan({ plan_name, payload }, { requestId })

        logger.info('Subscription plan update done', { requestId, plan_name })

        return new OK({
            message: 'Subscription plan updated successfully',
            data
        }).send(res);
    }

    deletePlan = async(req, res, next) => {
        const requestId = req.requestId
        const { plan_name } = req.body

        logger.info('Subscription plan deletion start', { requestId, plan_name })

        const data = await SubscriptionPlanService.deletePlan({ plan_name }, { requestId })

        logger.info('Subscription plan deletion done', { requestId, plan_name })

        return new OK({
            message: 'Subscription plan deleted successfully',
            data
        }).send(res);
    }
}

module.exports = {
    SubscriptionPlanController: new SubscriptionPlanController()
}