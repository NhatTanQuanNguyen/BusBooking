const jwt = require('jsonwebtoken')
const UserRepository = require('../models/repositories/user.repo')
const { BadRequestError, UnauthorizedError } = require('../core/error.response')
const { comparePasswordHash } = require('../core/sercurity')
const { redisCacheService } = require('./cache.service')
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../security/jwt.security')

class AccessService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }
    login = async ({ email, password }) => {

        let user = null
        try {
            user = await redisCacheService.getCache({
                key: `user:email:${email}`
            })
        } catch (err) {
            user = null
        }
        if (!user) {
            user = await this.userRepository.findByEmail({ email })

            if (!user) {
                throw new BadRequestError({
                    message: 'User not found'
                })
            }

            try {
                await redisCacheService.setCacheTTL({
                    key: `user:email:${email}`,
                    value: user,
                    ttl: 300
                })
            } catch (err) {
            }
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

        const accessToken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        })

        return {
            accessToken
        }
    }
}

module.exports = new AccessService(UserRepository)
