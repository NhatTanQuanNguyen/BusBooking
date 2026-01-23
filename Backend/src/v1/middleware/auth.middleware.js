const AccessService = require('../services/access.service')
const { UnauthorizedError } = require('../core/error.response')
const UserCacheService = require('../services/user.cache.service')
const { UserModel } = require('../models/user.model')

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new UnauthorizedError({ message: 'Missing Authorization header' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    throw new UnauthorizedError({ message: 'Missing token' })
  }

  // Verify JWT
  const payload = AccessService.verifyToken(token)

  // Redis-first
  let user = await UserCacheService.getUserById(payload.userId)

  // Cache miss → Mongo
  if (!user) {
    user = await UserModel.findById(payload.userId).populate('user_role')
    if (!user) {
      throw new UnauthorizedError({ message: 'User not found' })
    }

    // Back-fill cache
    await UserCacheService.setUser(user)
  }

  req.user = user
  req.token = token

  next()
}

module.exports = {
  verifyJWT
}
