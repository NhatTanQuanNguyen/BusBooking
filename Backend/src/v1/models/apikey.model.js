const mongoose = require('mongoose')

const DOCUMENT_NAME = 'apikey'
const COLLECTION_NAME = 'apikeys'

const apiKeySchema = new mongoose.Schema({
    company_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'bus_company',
        required : true
    },
    key : {
        type : String,
        unique :  true
    },
    permission: {
        type : String,
        enum : ['0000','1111','2222']
    },
    descripton : {
        type : String,
        default : ''
    },
    status : {
        type : String,
        enum : ['ACTIVE','INACTIVE','EXPIRE'],
        default : 'ACTIVE'
    },
    isDeleted : {
        type : Boolean,
        default: false,
        select: false
    }
},{
    timestamps : true,
    collection : COLLECTION_NAME
})


module.exports = {
    ApiKeyModel : mongoose.model(DOCUMENT_NAME,apiKeySchema)
}