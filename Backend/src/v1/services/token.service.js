const jwt = require('jsonwebtoken')

const signToken = ({ payload, privateKey, options = {} }) => {
    return jwt.sign(
        payload,
        privateKey,
        {
            algorithm: 'RS256',
            expiresIn: '15m',
            ...options,
        }
    )
}

const verifyToken = ({ token, publicKey, options = {} }) => {
    return jwt.verify(
        token,
        publicKey,
        {
            algorithms: ['RS256'],
            ...options, 
        }
    )
}

module.exports = {
    signToken,
    verifyToken
}
