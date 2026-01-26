const mongoose = require('mongoose')
const DOCUMENT_NAME='user'
const COLLECTION_NAME='users'

const userSchema = new mongoose.Schema({
    user_name : {
        type : String,
        required : true
    },
    user_email : {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique : true,
        index : true
    },
    user_password : {
        type: String,
        required : true
    },
    user_role : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'role'
    },
    user_keyToken : {
        type : String
    },
    isDeleted : {
        type : Boolean,
        default: false,
        select : false
    }
},{
    timestamps : true,
    collection : COLLECTION_NAME
})


module.exports = {
    UserModel : mongoose.model(DOCUMENT_NAME,userSchema)
}