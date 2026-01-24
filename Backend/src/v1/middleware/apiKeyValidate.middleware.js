const Joi = require('joi');
const { BadRequestError } = require('../core/error.response');
const { logger } = require('../helpers/logger/myLogger');
const { apiKey_permissions }= require('../models/apiKey.model');

const schemas = {
    create: Joi.object({
        permissions: Joi.array()
            .items(Joi.string().valid(...Object.values(apiKey_permissions)))
            .min(1)
            .required()
            .messages({
                'array.base': 'Permissions is must be an array',
                'any.only': 'Invalid permission value provided',
                'any.required': 'Please provide permissions for the API Key'
            })
    }),
    delete: Joi.object({
        key: Joi.string().required().messages({
            'any.required': 'API Key to delete must not be empty'
        })
    })
};

/**
 * @param {string} schemaName 
 * @param {string} property 
 */
const validateApiKey = (schemaName, property = 'body') => {
    return (req, res, next) => {
        const schema = schemas[schemaName];
        const requestId = req.headers['x-request-id'] || 'unknown-id';
        const data = req[property];

        const { error, value } = schema.validate(data, {
            abortEarly: false,  
            stripUnknown: true  
        });

        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');

            logger.error(`[VALIDATION_ERROR]: ${schemaName} failed`, requestId, {
                url: req.originalUrl,
                method: req.method,
                error: errorMessage,
                input: data
            });

            throw new BadRequestError({ message: errorMessage });
        }

        logger.info(`[VALIDATION_SUCCESS]: ${schemaName} passed`, requestId, {
            url: req.originalUrl,
            method: req.method
        });

        req[property] = value;
        next();
    };
};

module.exports = validateApiKey;