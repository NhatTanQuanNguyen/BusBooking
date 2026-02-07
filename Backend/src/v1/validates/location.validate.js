const Joi = require('joi')
const objectId = Joi.string().hex().length(24)

/**
 * POST /locations
 */
const createLocation = {
  body: Joi.object({
    code: Joi.string().trim().uppercase().max(20).required(),
    name: Joi.string().trim().max(255).required(),
    address: Joi.string().trim().max(500).allow('', null)
  }).options({ allowUnknown: false })
}

/**
 * GET /locations
 */
const listLocations = {
  query: Joi.object({
    limit: Joi.number().integer().min(1).max(100).default(10),
    skip: Joi.number().integer().min(0).default(0)
  }).options({ allowUnknown: false })
}

/**
 * GET /locations/:id
 */
const getLocationById = {
  params: Joi.object({
    id: objectId.required()
  }).options({ allowUnknown: false })
}

/**
 * PATCH /locations/:id
 */
const updateLocation = {
  params: Joi.object({
    id: objectId.required()
  }),
  body: Joi.object({
    code: Joi.string().trim().uppercase().max(20),
    name: Joi.string().trim().max(255),
    address: Joi.string().trim().max(500).allow('', null)
  })
    .min(1)
    .options({ allowUnknown: false })

}

//change status
const changeStatus = {
  params: Joi.object({
    id: objectId.required()
  }),
  body: Joi.object({
    status: Joi.string().valid('ACTIVE', 'INACTIVE').required()
  }).options({ allowUnknown: false })
}

/**
 * DELETE /locations/:id
 */
const deleteLocation = {
  params: Joi.object({
    id: objectId.required()
  }).options({ allowUnknown: false })
}

module.exports = {
  createLocation,
  listLocations,
  getLocationById,
  updateLocation,
  changeStatus,
  deleteLocation
}
