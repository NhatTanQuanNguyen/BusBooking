const router = require('express').Router()


router.use("/role",require("./role/index"))
router.use('/', require('./access'))

module.exports = router;