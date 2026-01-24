const router = require('express').Router()
const { apiKey_permissions } = require('../models/apiKey.model');
const { apiKey, permission } = require('../middleware');

router.use('/api-key', require('./apiKey/index'));
router.use(apiKey);
router.use(permission(apiKey_permissions.BASIC));

router.use("/role",require("./role/index"))

module.exports = router;

