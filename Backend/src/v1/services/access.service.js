const jwt = require('jsonwebtoken')

const UserRepository = require('../models/repositories/user.repo')
const { BadRequestError, UnauthorizedError } = require('../core/error.response')
const { comparePasswordHash } = require('../core/sercurity')
const { logger } = require('../helpers/logger/myLogger')

class AccessService {
    constructor(userRepository){
        this.userRepository = userRepository
    }

    login = async ({ email, password }) => {

        if (!email || !password) {
            throw new BadRequestError({
                message: 'Email and password are required'
            })
        }

        const user = await this.userRepository.findByEmail({ email })
        if (!user) {
            throw new BadRequestError({
                message: 'User not found'
            })
        }

        const isMatch = await comparePasswordHash({
            password,
            hashPassword: user.user_password
        })

        if (!isMatch) {
            throw new UnauthorizedError({
                message: 'Password is incorrect'
            })
        }

        const payload = {
            userId: user._id,
            role: user.user_role
        }

        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        logger.info('User login success', {
            userId: user._id,
            email: user.user_email
        })

        return {
            user: {
                id: user._id,
                name: user.user_name,
                email: user.user_email,
                role: user.user_role
            },
            accessToken
        }
    }
}

module.exports = new AccessService(UserRepository)
