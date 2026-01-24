const { hashPassword } = require('../core/sercurity')
const { UserModel } = require('../models/user.model')
const { RoleModel } = require('../models/role.model')
const { BadRequestError, NotFoundError } = require('../core/error.response')
const JwtCore = require('../core/jwt')
const { redisCacheService } = require('./cache.service')
const { logger } = require('../helpers/logger/myLogger')
const { validate } = require('../helpers/validate/validate')
const RegisterSchema = require('../routes/auth/register.validate')

const FILE_NAME = 'register.service.js'
const FUNCTION_NAME = 'RegisterService.register'

class RegisterService {
  static register = async (payload, requestId) => {
    const { email, password, fullName } = validate(RegisterSchema, payload)

    logger.info('Register start', requestId, {
      file: FILE_NAME,
      function: FUNCTION_NAME,
      email
    })

    // Check email in cache
    const emailKey = `user:email:${email}`
    const emailCached = await redisCacheService.getCache({ key: emailKey })

    if (emailCached) {
      logger.error('Register failed: email exists in cache', null, {
        file: FILE_NAME,
        function: FUNCTION_NAME,
        step: 'CHECK_EMAIL_CACHE',
        email 
      })
      throw new BadRequestError({ message: 'Email already registered' })
    }

    // Check DB
    let existingUser
    try {
      existingUser = await UserModel.findOne({
        user_email: email,
        isDeleted: false
      })
    } catch (error) {
      logger.error('Database error when checking email', requestId, {
        file: FILE_NAME,
        function: FUNCTION_NAME,
        step: 'CHECK_EMAIL_DB',
        email,
        error: err.message
      })
      throw error 
    }

    if (existingUser) {
      await redisCacheService.setCache({
        key: emailKey,
        value: 1
      })

      logger.error('Register failed: email exists in database', null, {
        file: FILE_NAME,
        function: FUNCTION_NAME,
        step: 'CHECK_EMAIL_DB',
        email,
        userId: existingUser._id.toString()
      })
      throw new BadRequestError({ message: 'Email already registered' })
    }


    // Get default role
    let userRole
    try {
      userRole = await RoleModel.findOne({ role_name: 'user' })
    } catch (error) {
      logger.error('Database error when getting role', requestId, {
        file: FILE_NAME,
        function: FUNCTION_NAME,
        step: 'GET_DEFAULT_ROLE',
        error: err.message
      })
      throw error
    }

    if (!userRole) {
      logger.error('Register failed: default role not found', null, {
        file: FILE_NAME,
        function: FUNCTION_NAME,
        step: 'GET_DEFAULT_ROLE',
        role: 'user'
      })
      throw new NotFoundError({ message: 'Default user role not found' })
    }

    // Hash password
    const passwordHash = await hashPassword({ password })

    // Create user
    let newUser
    try {
      newUser = await UserModel.create({
        user_name: fullName,
        user_email: email,
        user_password: passwordHash,
        user_role: userRole._id
      })
    } catch ( error) {
      logger.error('Database error when creating user', requestId, {
        file: FILE_NAME,
        function: FUNCTION_NAME,
        step: 'CREATE_USER',
        email,
        error: err.message
      })
      throw error
    }
    
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

    logger.info('Register success', null, {
      file: FILE_NAME,
      function: FUNCTION_NAME,
      userId: cacheUser.id
    })

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
