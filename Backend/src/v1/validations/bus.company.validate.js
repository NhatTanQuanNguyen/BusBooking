const Joi = require('joi')

const objectIdSchema = Joi.string()
    .hex()
    .length(24)
    .required();


const registration = Joi.object({
    brand_name: Joi.string().trim().min(3).max(100).required(),
    legal_entity: Joi.object({
        full_name: Joi.string().trim().max(100).optional(),
        address: Joi.string().trim().max(200).optional(),
        tax_code: Joi.string().trim().max(50).optional(),
    }).optional(),
    branches: Joi.array().items(
        Joi.object({
            name: Joi.string().trim().max(100).required(),
            address: Joi.string().trim().max(200).required(),
        })
    ).optional()
})

const subscribePlan = Joi.object({
    company_id: objectIdSchema,
    plan_name: Joi.string().trim().required()
})

const update = Joi.object({
    company_id: objectIdSchema,
    brand_name: Joi.string().trim().min(3).max(100).optional(),
    legal_entity: Joi.object({
        full_name: Joi.string().trim().max(100).optional(),
        address: Joi.string().trim().max(200).optional(),
        tax_code: Joi.string().trim().max(50).optional(),
    }).optional()
}).unknown(false)

const addBranch = Joi.object({
    company_id: objectIdSchema,
    branches: Joi.array().items(
        Joi.object({
            name: Joi.string().trim().max(100).required(),
            address: Joi.string().trim().max(200).required(),
        })
    ).min(1).required()
})

const deleteBranch = Joi.object({
    company_id: objectIdSchema,
    branch_id: objectIdSchema
}).unknown(false)

const updateBranch = Joi.object({
    company_id: objectIdSchema,
    branch_id: objectIdSchema,
    update_data: Joi.object({
        name: Joi.string().trim().max(100).optional(),
        address: Joi.string().trim().max(200).optional(),
    }).required()
}).unknown(false)

const quota = Joi.object({
    company_id: objectIdSchema,
})

module.exports = {
    registration,
    subscribePlan,
    update,
    addBranch,
    deleteBranch,
    updateBranch,
    quota
}
