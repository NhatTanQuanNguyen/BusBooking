const Joi = require('joi')

const createPlan = Joi.object({
    plan_name: Joi.string().trim().min(3).max(100).required(),
    price: Joi.number().positive().required(),
    duration_days: Joi.number().integer().positive().required(),
    quotas: Joi.object({
        max_buses: Joi.number().integer().positive().required(),
        max_routes: Joi.number().integer().positive().required(),
        api_calls_per_month: Joi.number().integer().positive().required(),
    }).required(),
}).unknown(false)

const updatePlan = Joi.object({
    plan_name: Joi.string().trim().min(3).max(100).required(),
    price: Joi.number().positive().optional(),
    duration_days: Joi.number().integer().positive().optional(),
    quotas: Joi.object({
        max_buses: Joi.number().integer().positive().optional(),
        max_routes: Joi.number().integer().positive().optional(),
        api_calls_per_month: Joi.number().integer().positive().optional(),
    }).optional(),
}).unknown(false)

const deletePlan = Joi.object({
    plan_name: Joi.string().trim().min(3).max(100).required(),
}).unknown(false)

module.exports = {
    createPlan,
    updatePlan,
    deletePlan
}