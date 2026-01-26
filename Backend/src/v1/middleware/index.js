const {v4 : uuidv4} = require('uuid')
const PermissionService = require('../services/Permission.service')
const { checkPermission } = require('../core/sercurity')
const { UnauthorizedError } = require('../core/error.response')
const { logger } = require('../helpers/logger/myLogger')

const generateRequestId = (req,res,next) => {
    const requestId = req.requestId || uuidv4()

    req.requestId = requestId

    next()
}

const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const requestId = req.requestId

    // LOG CHI TIẾT (CHO DEV)
    logger.error('Unhandled error', {
        requestId,
        statusCode,
        name: err.name,
        message: err.message,
        stack: err.stack,
        method: req.method,
        path: req.originalUrl
    })

    // RESPONSE GỌN (CHO CLIENT)
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        requestId
    })
}

const generatePermission = async () => {
    return await PermissionService.generatePermission()
}

const requiredPermission = (requirePermission) => {
    return (req,res,next) => {
        const userPermissions = req.body.permissions || []
        
        const allowed  = checkPermission(userPermissions,requirePermission)

        console.log({allowed})

        if (!allowed) throw new UnauthorizedError({
            message : 'Permission denied'
        })

        next()
    }
    
}
module.exports = {
    generateRequestId,
    handleError,
    generatePermission,
    requiredPermission
}