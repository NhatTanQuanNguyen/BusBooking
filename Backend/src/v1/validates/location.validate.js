const Joi = require('joi')
const objectId = Joi.string().hex().length(24)

/**
 * POST /locations
 */
const createLocation = {
  body: Joi.object({
    code: Joi.string().trim().required(),
    name: Joi.string().trim().required(),
    address: Joi.string().trim().empty('').default(null)
  })
}

/**
 * GET /locations
 */
const listLocations = {
  query: Joi.object({
    limit: Joi.number().integer().min(1).max(100).default(10),
    skip: Joi.number().integer().min(0).default(0),
    status: Joi.string().valid('ACTIVE', 'INACTIVE')
  })
}

/**
 * GET /locations/:id
 */
const getLocationById = {
  params: Joi.object({
    id: objectId.required()
  })
}

/**
 * PATCH /locations/:id
 */
const updateLocation = {
  params: Joi.object({
    id: objectId.required()
  }),
  body: Joi.object({
    name: Joi.string().trim(),
    address: Joi.string().trim().empty('').default(null),
    status: Joi.string().valid('ACTIVE', 'INACTIVE')
  }).min(1)
}

/**
 * DELETE /locations/:id
 */
const deleteLocation = {
  params: Joi.object({
    id: objectId.required()
  })
}

module.exports = {
  createLocation,
  listLocations,
  getLocationById,
  updateLocation,
  deleteLocation
}
