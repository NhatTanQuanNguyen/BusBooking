const jwt = require('jsonwebtoken')

class TokenService {
  static generateAccessToken(payload) {
    if (!process.env.JWT_PRIVATE_KEY) {
      throw new Error('JWT_PRIVATE_KEY is not defined')
    }

    return jwt.sign(
      payload,
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    )
  }

  static verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_PRIVATE_KEY)
  }
}

module.exports = TokenService
