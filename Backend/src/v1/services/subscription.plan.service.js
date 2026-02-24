const { logger } = require('../helpers/logger/myLogger')
const { SubscriptionPlanModel } = require('../models/subscription.plan.model')
const { BadRequestError } = require('../core/error.response')

class SubscriptionPlanService {
    createPlan = async ({ plan_name, price, duration_days, quotas }, { requestId }) => {
        logger.info('Creating subscription plan', { plan_name, requestId })

        const existed = await SubscriptionPlanModel.findOne({ plan_name }).lean()
        if (existed) {
            if (!existed.isDeleted) {
                throw new BadRequestError({ message: 'Subscription plan is already exists' })
            }
           
            const restoredPlan = await SubscriptionPlanModel.findOneAndUpdate(
                { plan_name }, 
                { 
                    price, 
                    duration_days, 
                    quotas,
                    isDeleted: false 
                }, 
                { new: true }
            ).lean()
            
            logger.info('Subscription plan restored successfully', { plan_name, requestId })
            return restoredPlan
        }

        const newPlan = await SubscriptionPlanModel.create({ 
            plan_name, 
            price, 
            duration_days, 
            quotas 
        })
        logger.info('Subscription plan created successfully', { plan_name, requestId })

        return newPlan
    }

    updatePlan = async ({ plan_name, payload }, { requestId }) => {
        logger.info('Updating subscription plan', { plan_name, requestId })

        const plan = await SubscriptionPlanModel.findOne({ plan_name }).lean()
        if (!plan || plan.isDeleted) {
            throw new BadRequestError({ message: 'Subscription plan not found' })
        }

        const updatedPlan = await SubscriptionPlanModel.findOneAndUpdate(
            { plan_name }, 
            payload, 
            { new: true }
        ).lean()

        logger.info('Subscription plan updated successfully', { plan_name, requestId })
        return updatedPlan
    }

    deletePlan = async ({ plan_name }, { requestId }) => {
        logger.info('Deleting subscription plan', { plan_name, requestId })     

        const deletedPlan = await SubscriptionPlanModel.findOne({ plan_name }).lean()

        if (!deletedPlan || deletedPlan.isDeleted) {
            throw new BadRequestError({ message: 'Subscription plan not found' })
        }

        await SubscriptionPlanModel.updateOne({ plan_name }, { isDeleted: true })

        logger.info('Subscription plan deleted successfully', { plan_name, requestId })
        return deletedPlan
    }
}

module.exports = {
    SubscriptionPlanService: new SubscriptionPlanService()
}