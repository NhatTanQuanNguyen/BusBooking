const { redisCacheService } = require('./cache.service')

const USER_TTL = 60 * 60

class UserCacheService {

  static buildIdKey(userId) {
    return `user:id:${userId}`
  }

  static buildEmailKey(email) {
    return `user:email:${email}`
  }

  static async setUser(user) {
    const data = {
      id: user._id.toString(),
      name: user.user_name,
      email: user.user_email,
      role: user.user_role_name || user.user_role, 
      isDeleted: user.isDeleted || false
    }

    await Promise.all([
      redisCacheService.setCacheTTL({
        key: this.buildIdKey(data.id),
        value: data,
        ttl: USER_TTL
      }),
      redisCacheService.setCacheTTL({
        key: this.buildEmailKey(data.email),
        value: data,
        ttl: USER_TTL
      })
    ])
  }

  static async getUserById(userId) {
    return redisCacheService.getCache({
      key: this.buildIdKey(userId)
    })
  }

  static async getUserByEmail(email) {
    return redisCacheService.getCache({
      key: this.buildEmailKey(email)
    })
  }

  static async deleteUser({ userId, email }) {
    const keys = [this.buildIdKey(userId)]
    if (email) keys.push(this.buildEmailKey(email))

    await Promise.all(
      keys.map(key =>
        redisCacheService.deleteCache({ key })
      )
    )
  }
}

module.exports = UserCacheService
