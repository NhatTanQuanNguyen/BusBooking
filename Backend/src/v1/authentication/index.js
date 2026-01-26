const { BadRequestError, ForbiddenError } = require("../core/error.response")
const { ApiKeyServices } = require("../services/api.key.service")
const { verifyToken } = require("../services/token.service")
const userService = require("../services/user.service")

const checkApiKey =({permission}) => {
    return async (req,res,next) => {
        const apiKey = req.headers['x-api-key']
        if (!apiKey) throw new BadRequestError({
            message : "missing api key"
        })

        const isAllow = await ApiKeyServices.checkPermission({key :apiKey,permission})

        if (!isAllow) throw new ForbiddenError({
            message : "forbidden error"
        })

        next()
    }
}


const checkToken = async ({token,userId}) => {
    const {publicKey} = await userService.getPublicKeyUser({userId})

    if (!publicKey) throw new BadRequestError({
        message : "not login"
    })

    const decode = verifyToken({token,publicKey})

    if (!decode) throw new ForbiddenError({
        message : "token error"
    })

    return decode
}

const authentication = async (req,res,next) => {
    const userId = req.userId
    if (!userId) throw new BadRequestError({
        message : "missing userId"
    })
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        throw new UnauthorizedError('MISSING_AUTH_HEADER')
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        throw new UnauthorizedError('INVALID_AUTH_HEADER')
    }

    const decode = checkToken({token,userId})

    req.user = {
        ...decode,
        userId
    }

    next()
}


module.exports = {
    checkApiKey,
    authentication

}