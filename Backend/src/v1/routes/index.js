const router = require('express').Router()


router.use("/role",require("./role/index"))
router.use("/auth", require("./auth/index"))


module.exports = router;