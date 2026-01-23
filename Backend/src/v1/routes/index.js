const router = require('express').Router()
const { apiKey, permission } = require('../middleware');

router.use('/api-key', require('./apiKey/index'));
router.use(apiKey);
router.use(permission('0000'));

router.use("/role",require("./role/index"))

module.exports = router;

