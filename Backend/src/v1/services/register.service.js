const { hashPassword } = require('../core/sercurity')
const { UserModel } = require('../models/user.model')
const { RoleModel } = require('../models/role.model')
const { BadRequestError, NotFoundError } = require('../core/error.response')
const TokenService = require('./token.service')
const UserCacheService = require('./user.cache.service')


class RegisterService {
  static register = async ({ email, password, fullName }) => {

    // Validate input
    if (!email || !password || !fullName) {
      throw new BadRequestError({
        message: 'Email, password and fullName are required'
      })
    }

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

    // Hash password
    const passwordHash = await hashPassword({ password })

    // Create user
    const newUser = await UserModel.create({
      user_name: fullName,
      user_email: email,
      user_password: passwordHash,
      user_role: userRole._id
    })
    await UserCacheService.setUser(newUser)

    // Generate token
    const accessToken = TokenService.generateAccessToken({
      userId: newUser._id,
      email: newUser.user_email,
      role: userRole.role_name
    })

    // Response
    return {
      user: {
        id: newUser._id,
        name: newUser.user_name,
        email: newUser.user_email,
        role: userRole.role_name
      },
      tokens: {
        accessToken
      }
    }
  }
}

module.exports = RegisterService
