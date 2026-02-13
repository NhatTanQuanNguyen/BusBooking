const router = require('express').Router()

const { checkApiKey } = require('../authentication')
const { generateApiKey } = require('../controllers/api.key.controller')
const { getAllUser } = require('../controllers/user.controller')
const { OK } = require('../core/success.response')
const { asyncHandler } = require('../helpers/handler/asyncHandler')

// ===== Public / Utility routes =====

router.get('/user/hello', (req, res, next) => {
    return new OK({
        message: 'success',
        data: 'OK'
    }).send(res)
})

router.get('/user/getall', asyncHandler(getAllUser))

// ===== API KEY middleware =====

router.use(
    asyncHandler(
        checkApiKey({
            permission: '0000'
        })
    )
)

// ===== Feature routes =====

router.use('/bus-company', require('./bus-company/index'))
router.use('/apikey', require('./api-key/index'))
router.use('/route', require('./route/index'))
router.use('/location', require('./location/index'))
router.use('/staff', require('./staff/index'))
router.use('/role', require('./role/index'))
router.use('/auth', require('./auth/index'))
router.use('/bus', require('./bus/index'))

module.exports = router
