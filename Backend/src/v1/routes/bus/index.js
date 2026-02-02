const router = require('express').Router()

router.use('/', require('./bus.route'))
router.use('/', require('./bus.document.route'))
router.use('/', require('./bus.maintenance.route'))

module.exports = router
