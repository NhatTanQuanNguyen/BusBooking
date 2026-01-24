const TokenService = require('./auth/token.service')
const { ForbiddenError, UnauthorizedError } = require('../core/error.response')
const { checkPermission } = require('../core/sercurity')

class AccessService {

  static verifyToken(token) {
    if (!token) {
      throw new UnauthorizedError({
        message: 'Access token is required'
      })
    }

    try {
      return TokenService.verifyAccessToken(token)
    } catch (error) {

      throw new UnauthorizedError({
        message: 'Invalid or expired token'
      })
    }
  }

  static authorize({ userPermissions = [], requiredPermission }) {
    const allowed = checkPermission(userPermissions, requiredPermission)

    if (!allowed) {
      throw new ForbiddenError({
        message: 'Permission denied'
      })
    }

    return true
  }
}

module.exports = AccessService
