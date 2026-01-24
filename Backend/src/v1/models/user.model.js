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
        trim: true
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
    isDeleted : {
        type : Boolean,
        default: false,
        select : false
    }
},{
    timestamps : true,
    collection : COLLECTION_NAME
})

userSchema.index(
    { user_email: 1 },
    { unique: true, partialFilterExpression: { isDeleted: false } }
)

module.exports = {
    UserModel : mongoose.model(DOCUMENT_NAME,userSchema)
}