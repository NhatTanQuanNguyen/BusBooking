const router = require('express').Router()


router.use("/role",require("./role/index"))


module.exports = router;

import apiKeyRoute from "./apiKey.route.js";

export default (app) => {
  app.use("/v1/api-keys", apiKeyRoute);
};
