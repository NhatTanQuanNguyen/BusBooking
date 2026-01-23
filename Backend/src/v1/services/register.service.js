const { hashPassword } = require('../core/sercurity')
const { UserModel } = require('../models/user.model')
const { RoleModel } = require('../models/role.model')
const { BadRequestError, NotFoundError } = require('../core/error.response')
const JwtCore = require('../core/jwt')
const { redisCacheService } = require('./cache.service')

const USER_TTL = 60 * 60

class RegisterService {
  static register = async ({ email, password, fullName }) => {

    // Check email exists
    const existingUser = await UserModel.findOne({
      user_email: email,
      isDeleted: false
    })

    if (existingUser) {
      throw new BadRequestError({
        message: 'Email already registered'
      })
    }

    // Get default role
    const userRole = await RoleModel.findOne({ role_name: 'user' })
    if (!userRole) {
      throw new NotFoundError({
        message: 'Default user role not found'
      })
    }


    if (!userRole) {
      throw new NotFoundError({
        message: 'Default user role not found'
      })
    }

    // Hash password
    const passwordHash = await hashPassword({ password })

    // Create user
    const newUser = await UserModel.create({
      user_name: fullName,
      user_email: email,
      user_password: passwordHash,
      user_role: userRole._id
    })
    
    // Format data
    const cacheUser = {
      id: newUser._id.toString(),
      email: newUser.user_email,
      role: userRole.role_name,
      name: newUser.user_name
    }

    // Save cache
    await Promise.all([
      redisCacheService.setCacheTTL({
        key: `user:id:${cacheUser.id}`,
        value: cacheUser,
        ttl: USER_TTL
      }),
      redisCacheService.setCacheTTL({
        key: `user:email:${cacheUser.email}`,
        value: cacheUser,
        ttl: USER_TTL
      })
    ])

    // Generate token
    const accessToken = JwtCore.generateAccessToken({
      userId: cacheUser.id,
      email: cacheUser.email,
      role: cacheUser.role
    })

    // Response
    return {
      user: cacheUser,
      tokens: {
        accessToken
      }
    }
  }
}

module.exports = RegisterService
