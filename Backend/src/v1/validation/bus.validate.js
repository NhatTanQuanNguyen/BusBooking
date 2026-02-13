const Joi = require("joi");
const { BadRequestError } = require("../core/error.response");

// ================= SCHEMAS =================

// CREATE
const createBusSchema = Joi.object({
  busId: Joi.string()
    .pattern(/^BUS[0-9]{6}$/)
    .required()
    .messages({
      "string.pattern.base": "Bus ID must be BUSxxxxxx",
    }),

  license: Joi.string().required(),

  companyId: Joi.string().required(),

  type: Joi.string().min(2).max(50).required(),

  status: Joi.string().min(2).max(50).default("active"),

  miles: Joi.number().min(0).default(0),

  seats: Joi.array()
    .items(
      Joi.object({
        seatCode: Joi.string().required(),
        floor: Joi.number().min(1).default(1),
        row: Joi.number().min(1),
        column: Joi.number().min(1),
        type: Joi.string().min(2).max(50).default("seat"),
        isActive: Joi.boolean().default(true),
      }),
    )
    .default([]),
});

// UPDATE (PATCH)
const updateBusSchema = Joi.object({
  type: Joi.string().min(2).max(50),
  status: Joi.string().min(2).max(50),
  miles: Joi.number().min(0),
  seats: Joi.array().items(
    Joi.object({
      seatCode: Joi.string().required(),
      floor: Joi.number().min(1).default(1),
      row: Joi.number().min(1),
      column: Joi.number().min(1),
      type: Joi.string().min(2).max(50),
      isActive: Joi.boolean(),
    }),
  ),
}).min(1);

// PARAM
const busIdParamSchema = Joi.object({
  busId: Joi.string()
    .pattern(/^BUS[0-9]{6}$/)
    .required(),
});

// QUERY
const busQuerySchema = Joi.object({
  companyId: Joi.string(),
  status: Joi.string().min(2).max(50),
  type: Joi.string().min(2).max(50),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

// ================= MIDDLEWARE =================

const validate =
  (schema, source = "body") =>
  (req, _res, next) => {
    const { error, value } = schema.validate(req[source], {
      stripUnknown: true,
      abortEarly: false,
    });

    if (error) {
      throw new BadRequestError({
        message: "Invalid request data",
        errors: error.details.map((d) => d.message),
      });
    }

    req[source] = value;
    next();
  };

module.exports = {
  validateCreateBus: validate(createBusSchema),
  validateUpdateBus: validate(updateBusSchema),
  validateBusId: validate(busIdParamSchema, "params"),
  validateBusQuery: validate(busQuerySchema, "query"),
};
