const mongoose = require('mongoose')

const DOCUMENT_NAME='role'
const COLLECTION_NAME='roles'
const roleSchema = new mongoose.Schema({
    role_name : {
        type: String,
        required : true,
        unique: true,
        trim : true,
        match: [/^[a-z_-]+$/, 'Invalid role_name format']
    },
    role_permission : []
},{
    collection : COLLECTION_NAME,
    timestamps : true
})


module.exports = {
    RoleModel : mongoose.model(DOCUMENT_NAME,roleSchema)
}