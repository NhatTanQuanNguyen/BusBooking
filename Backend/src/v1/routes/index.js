const { checkApiKey } = require("../authentication");
const { generateApiKey } = require("../controllers/api.key.controller");
const { asyncHandler } = require("../helpers/handler/asyncHandler");

const router = require("express").Router();
router.post("/apikey/generate", generateApiKey);

router.use(
  asyncHandler(
    checkApiKey({
      permission: "0000",
    }),
  ),
);

router.use("/role", require("./role/index"));
router.use("/auth", require("./auth/index"));
router.use("/bus", require("./bus/index"));

module.exports = router;
