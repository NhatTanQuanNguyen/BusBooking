const { Schema, model } = require('mongoose');

const apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true, 
    },
    permissions: {
        type: [String],
        required: true,
        enum: ['0000', '1111', '2222'], 
    },
    isDeleted: {
        type: Boolean,
        default: false,
        index: true, 
    }
}, {
    timestamps: true,
    collection: 'ApiKeys'
});

module.exports = model('ApiKey', apiKeySchema);