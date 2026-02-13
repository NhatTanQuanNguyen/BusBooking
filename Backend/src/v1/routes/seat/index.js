const router = require("express").Router();

router.use("/", require("./seatLayout.route"));
router.use("/", require("./seatTimeplate.route"));

module.exports = router;
