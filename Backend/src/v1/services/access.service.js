const { BadRequestError } = require("../core/error.response")
const { getInfoData } = require("../utils")
const { createKeyToken } = require("./key.token.service")
const { signToken } = require("./token.service")
const userService = require("./user.service")
const {logger} = require("../helpers/logger/myLogger")
const { comparePasswordHash } = require("../core/sercurity")

class AccessService{
    async register({name,email,password,role},{requestId}){
        logger.info('Register started', { requestId, email })

        const existed = await userService.checkUserExists({ email })
        if (existed) {
            logger.warn('Register failed - user exists', { requestId, email })
            throw new BadRequestError({ message : "User is exists" })
        }

        const { publicKey, privateKey } = createKeyToken()
        logger.info('RSA key generated for register', { requestId, email })

        const newUser = await userService.createUser({
            name,
            email,
            password,
            role,
            keyToken : publicKey
        })

        if (!newUser) {
            logger.error('Register failed - create user error', { requestId, email })
            throw new BadRequestError({ message : "Sign in failled" })
        }

        logger.info('User created successfully', {
            requestId,
            userId: newUser._id
        })

        const token = signToken({
            payload : {
                email : newUser.user_email,
                role : newUser.user_role
            },
            privateKey
        })

        logger.info('Access token issued (register)', {
            requestId,
            userId: newUser._id
        })

        try{
            await userService.setCacheUser({email : newUser.user_email})
            logger.info('User cache updated', { requestId, userId: newUser._id })
        }catch(error){
            logger.error(error.message,requestId,{})
        }

        return {
            user : getInfoData(["_id","user_email","user_role"], newUser),
            token
        }
    }

    async login({email,password},{requestId}){
        logger.info('Login started', { requestId, email })

        const found = await userService.findUserByEmail({ email })

        if (!found) {
            logger.warn('Login failed - user not found', { requestId, email })
            throw new BadRequestError({ message : "User not found !!!" })
        }

        console.log({found})

        const isMatched = await comparePasswordHash({password,hashPassword : found.user_password})

        if (!isMatched) throw new BadRequestError({
            message : "password error"
        })

        logger.info('User found for login', {
            requestId,
            userId: found._id
        })

        const { publicKey, privateKey } = createKeyToken()
        logger.info('RSA key generated for login', {
            requestId,
            userId: found._id
        })

        const updated = await userService.updatePublicKeyToken({
            email : found.user_email,
            publicKey
        })

        console.log({updated})

        if (!updated) {
            logger.error('Login failed - update public key error', {
                requestId,
                email
            })
            throw new BadRequestError({ message : "Login failled" })
        }

        logger.info('Public key updated for user', {
            requestId,
            userId: updated._id
        })

        const newToken = signToken({
            payload : {
                email : updated.user_email,
                role : updated.user_role
            },
            privateKey
        })

        logger.info('Access token issued (login)', {
            requestId,
            userId: updated._id
        })

        return {
            user : getInfoData(["_id","user_email","user_role"], updated),
            token : newToken
        }  
    }

    async logout({email},{requestId}){
        logger.info('Logout started', requestId,{email })

        console.log({email})
        const found = await userService.findUserByEmail({ email })


        if (!found) {
            logger.warn('Logout failed - user not found', { requestId, email })
            throw new BadRequestError({ message : "User not found !!!" })
        }

        await userService.updatePublicKeyToken({
            email : found.user_email,
            publicKey : null
        })

        logger.info('User logged out successfully', {
            requestId,
            userId: found._id
        })

        return {}
    }
}

module.exports = {
    AccessService : new AccessService()
}
