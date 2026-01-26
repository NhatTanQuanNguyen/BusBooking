const {BadRequestError, ForbiddenError} = require('../core/error.response')
const crypto = require('node:crypto')
const { ApiKeyModel } = require('../models/apikey.model')
class ApiKeyServices{
    generate = async ({permission = '0000'}) => {
        const key = crypto.randomBytes(32).toString('hex')

        const apiKey = await ApiKeyModel.create({
            key,
            permission
        })

        if (!apiKey) throw new BadRequestError({
            message : "generate failled"
        })

        return {
            apikey : apiKey.key,
            description : apiKey.descripton
        }

    }


    delete = async ({key}) => {
        const apiKey = await ApiKeyModel.findOneAndUpdate(
            {key},
            {
                $set : {
                    isDeleted : true,
                    status : 'INACTIVE'
                }
            },{
                new : true
            }
        ).lean()

        if (!apiKey) throw new BadRequestError({
            message : "Key not found"
        })

        return {}
    }

    checkPermission = async ({key,permission}) => {
        const apikey = await ApiKeyModel.findOne({key,isDeleted : false,status : 'ACTIVE'}).lean()
        if (!apikey) throw new BadRequestError({
            message : 'api key not found !!!'
        })

        if (permission !== apikey.permission) return false;

        return true
    }
}

module.exports = {
    ApiKeyServices : new ApiKeyServices()
}