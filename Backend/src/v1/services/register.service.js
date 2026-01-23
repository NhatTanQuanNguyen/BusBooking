const { hashPassword } = require('../core/sercurity')
const { UserModel } = require('../models/user.model')
const { RoleModel } = require('../models/role.model')
const { BadRequestError, NotFoundError } = require('../core/error.response')
const JwtCore = require('../core/jwt')
const { redisCacheService } = require('./cache.service')
const { logger } = require('../helpers/logger/myLogger')

class RegisterService {
  static register = async ({ email, password, fullName }) => {

    logger.info('Register start', null, { email })

    // Check email in cache
    const emailKey = `user:email:${email}`
    const emailCached = await redisCacheService.getCache({ key: emailKey })

    if (emailCached) {
      logger.info('Register blocked by cache', null, { email })
      throw new BadRequestError({ message: 'Email already registered' })
    }

    // Check DB
    const existingUser = await UserModel.findOne({
      user_email: email,
      isDeleted: false
    })

    if (existingUser) {
      await redisCacheService.setCache({
        key: emailKey,
        value: 1
      })

      logger.info('Register blocked by DB', null, { email })
      throw new BadRequestError({ message: 'Email already registered' })
    }


    // Get default role
    const userRole = await RoleModel.findOne({ role_name: 'user' })
    if (!userRole) {
      logger.error('Default role not found')
      throw new NotFoundError({ message: 'Default user role not found' })
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
      redisCacheService.setCache({
        key: `user:email:${email}`,
        value: 1
      }),
      
      redisCacheService.setCache({
        key: `user:id:${cacheUser.id}`,
        value: cacheUser
      })
    ])

    logger.info('Register success', null, { userId: cacheUser.id })

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
