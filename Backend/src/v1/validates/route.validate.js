const Joi = require('joi')
const mongoose = require('mongoose')

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid')
  }
  return value
}, 'ObjectId validation')

/**
 * POST /routes
 */
const createRoute = {
  body: Joi.object({
    code: Joi.string().trim().required(),
    name: Joi.string().trim().required(),

    originId: objectId.required(),
    destinationId: objectId.required(),

    distanceKm: Joi.number().min(0).allow(null),
    minTime: Joi.number().min(0).allow(null),
    maxTime: Joi.number().min(0).allow(null),

    stops: Joi.string().trim().allow('', null),

    status: Joi.string().valid('ACTIVE', 'INACTIVE')
  })
}

/**
 * GET /routes
 */
const listRoutes = {
  query: Joi.object({
    limit: Joi.number().integer().min(1).max(100).default(10),
    skip: Joi.number().integer().min(0).default(0),

    status: Joi.string().valid('ACTIVE', 'INACTIVE'),
    originId: objectId,
    destinationId: objectId
  })
}

/**
 * GET /routes/:id
 */
const getRouteById = {
  params: Joi.object({
    id: objectId.required()
  })
}

/**
 * PATCH /routes/:id
 */
const updateRoute = {
  params: Joi.object({
    id: objectId.required()
  }),
  body: Joi.object({
    name: Joi.string().trim(),
    distanceKm: Joi.number().min(0).allow(null),
    minTime: Joi.number().min(0).allow(null),
    maxTime: Joi.number().min(0).allow(null),
    stops: Joi.string().trim().allow('', null),
    status: Joi.string().valid('ACTIVE', 'INACTIVE')
  }).min(1) 
}

/**
 * DELETE /routes/:id
 */
const deleteRoute = {
  params: Joi.object({
    id: objectId.required()
  })
}

module.exports = {
  createRoute,
  listRoutes,
  getRouteById,
  updateRoute,
  deleteRoute
}
