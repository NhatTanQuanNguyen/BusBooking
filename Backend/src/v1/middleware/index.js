const {v4 : uuidv4} = require('uuid')

const generateRequestId = (req,res,next) => {
    const requestId = req.requestId || uuidv4()

    req.requestId = requestId

    next()
}

module.exports = {
    generateRequestId
}