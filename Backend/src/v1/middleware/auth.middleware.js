const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../core/error.response')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        throw new UnauthorizedError({ message: 'Missing Authorization header' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        throw new UnauthorizedError({ message: 'Invalid Authorization format' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        req.user = decoded
        next()
    } catch (error) {
        throw new UnauthorizedError({ message: 'Invalid or expired token' })
    }
}

module.exports = {
    verifyJWT
}
