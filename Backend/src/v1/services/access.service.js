const jwt = require('jsonwebtoken')
const { hashPassword } = require('../core/sercurity')
const { UserModel } = require('../models/user.model')
const { RoleModel } = require('../models/role.model')
const { BadRequestError } = require('../core/error.response')

class AccessServices {
    static register = async ({ email, password, fullName}) => {

        //Check mail ton tai
        const exitsUser = await UserModel.findOne({ 
            user_email: email,
            isDeleted: false
         })
        if (exitsUser) {
            throw new BadRequestError({
                message: 'Email already registered'
            })
        }

        //Default role
        const userRole = await RoleModel.findOne({ role_name: 'user' })
        if (!userRole) {
            throw new Error('Default user role not found')
        }

        //Hash Password
        const passwordHash = await hashPassword({ password })

        //Create user
        const newUser = await UserModel.create({
            user_name: fullName,
            user_email: email,
            user_password: passwordHash,
            user_role: userRole._id
        })

        //Generate JWT
        if (!process.env.JWT_PRIVATE_KEY) {
            throw new Error('JWT_PRIVATE_KEY is not defined')
        }

        //Create JWT
        const accessToken = jwt.sign(
            {
                userId: newUser._id,
                email: newUser.user_email,
                role: userRole.role_name
            },
            process.env.JWT_PRIVATE_KEY,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '7d'
            }
        )

        //Response data
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

module.exports = AccessServices