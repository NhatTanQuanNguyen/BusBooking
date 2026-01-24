const jwt = require('jsonwebtoken')

class JwtCore {
  constructor({ privateKey, expiresIn }) {
    if (!privateKey) {
      throw new Error('JWT_PRIVATE_KEY is not defined')
    }

    this.privateKey = privateKey
    this.expiresIn = expiresIn || '7d'
  }

  generateAccessToken(payload) {
    return jwt.sign(payload, this.privateKey, {
      expiresIn: this.expiresIn
    })
  }

  verifyAccessToken(token) {
    return jwt.verify(token, this.privateKey)
  }

  static init() {
    if (!this.instance) {
      this.instance = new JwtCore({
        privateKey: process.env.JWT_PRIVATE_KEY,
        expiresIn: process.env.JWT_EXPIRES_IN
      })
    }
    return this.instance
  }
}

module.exports = JwtCore.init()
