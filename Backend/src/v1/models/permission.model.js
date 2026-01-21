const mongoose = require('mongoose')

const DOCUMENT_NAME='permission'
const COLLECTION_NAME='permissions'
const permissionSchema = new mongoose.Schema({
    code : {
        type : String,
        required : true,
        unique: true,
        trim: true,
        lowercase: true
    }
},{
    collection : COLLECTION_NAME,
    timestamps : true
})


module.exports = {
    PermissionModel : mongoose.model(DOCUMENT_NAME,permissionSchema)
}