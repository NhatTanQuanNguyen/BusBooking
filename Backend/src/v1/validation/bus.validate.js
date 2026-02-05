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

  type: Joi.string().valid("seat", "sleeper", "limousine", "vip").required(),

  status: Joi.string()
    .valid("active", "inactive", "maintenance", "repair")
    .default("active"),

  miles: Joi.number().min(0).default(0),
});

// UPDATE (PATCH)
const updateBusSchema = Joi.object({
  type: Joi.string().valid("seat", "sleeper", "limousine", "vip"),
  status: Joi.string().valid("active", "inactive", "maintenance", "repair"),
  miles: Joi.number().min(0),
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
  status: Joi.string().valid("active", "inactive", "maintenance", "repair"),
  type: Joi.string().valid("seat", "sleeper", "limousine", "vip"),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

// ================= MIDDLEWARES =================

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
