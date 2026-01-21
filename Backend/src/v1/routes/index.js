const { helloController } = require('../controllers');
const { asyncHandler } = require('../helpers/handler/asyncHandler');
const { logger } = require('../helpers/logger/myLogger');
const { generateRequestId } = require('../middleware');

const router = require('express').Router()


router.get("/hello",generateRequestId,asyncHandler(helloController))

module.exports = router;

import apiKeyRoute from "./apiKey.route.js";

export default (app) => {
  app.use("/v1/api-keys", apiKeyRoute);
};

