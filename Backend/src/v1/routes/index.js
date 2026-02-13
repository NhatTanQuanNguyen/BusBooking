const { checkApiKey } = require("../authentication");
const { generateApiKey } = require("../controllers/api.key.controller");
const { asyncHandler } = require("../helpers/handler/asyncHandler");

const router = require('express').Router()

router.use("/bus-company",require("./bus-company/index"))
router.use("/apikey",require("./api-key/index"))

router.use("/role",require("./role/index"))
router.use("/auth",require("./auth/index"))
router.use("/route",require("./route/index"))
router.use("/location",require("./location/index"))

router.use("/role", require("./role/index"));
router.use("/auth", require("./auth/index"));
router.use("/bus", require("./bus/index"));

module.exports = router;
