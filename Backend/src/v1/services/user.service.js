const { BadRequestError, UnauthorizedError, InternalServerError } = require("../core/error.response");
const { hashPassword } = require("../core/sercurity");
const { logger } = require("../helpers/logger/myLogger");
const userRepo = require("../models/repositories/user.repo");
const UserRepository = require("../models/repositories/user.repo");
const userModel = require("../models/user.model");
const { redisCacheService } = require("./cache.service");
const {SingleFlightWrapper}  = require('../helpers/singleRequest/singleFlight')
/**
 * @param {UserRepository} userRepository
 */

class UserServices {
    constructor(userRepository) {
        /**
         * @type {UserRepository}
         */
        this.userRepository = userRepository
    }

    

    findUserByEmail = async ({ email }) => {
        return await userRepo.findUserByEmail({ email })
    }

    createUser = async ({ name, email, password, role, keyToken }) => {
        const passwordHashed = await hashPassword({ password })
        return await userRepo.createUser({ name, email, passwordHashed, role, keyToken })
    }

    updatePublicKeyToken = async ({ email, publicKey }) => {
        return await userRepo.updatePublicKey({ email, publicKey })
    }

    checkUserExists = async ({ email }) => {
        const existed = await redisCacheService.getCache({
            key: `user:email:${email}`
        })

        if (existed) return true

        const foundDB = await UserRepository.checkUserExist({ email })

        if (foundDB) return true

        return false
    }

    setCacheUser = async ({ email }) => {
        await redisCacheService.setCacheTTL({
            key: `user:email:${email}`,
            value: 1
        })
    }

    getPublicKeyUser = async ({userId}) => {
        const found = await userRepo.findUserById({id : userId})
        if (!found) throw new BadRequestError({
            message : "user not found"
        })

        return {
            publicKey : found.user_keyToken
        }
    }

    getAllUser = async () => {
        const result = SingleFlightWrapper.run('getalluser',this.userRepository.findAllUser)

        return result
    }

    
}

module.exports = new UserServices(userRepo)
