const router = require("express").Router();

router.use("/", require("./bus.route"));

module.exports = router;
