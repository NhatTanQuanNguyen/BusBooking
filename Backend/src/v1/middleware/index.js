const {v4 : uuidv4} = require('uuid')

const generateRequestId = (req,res,next) => {
    const requestId = req.requestId || uuidv4()

    req.requestId = requestId

    next()
}

const handleError = (err,req,res,next) => {
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    })
}
module.exports = {
    generateRequestId,
    handleError
}