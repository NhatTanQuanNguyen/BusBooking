const { Schema, model } = require('mongoose');

const apiKey_permissions = {
    BASIC: '0000',
    ADMIN: '1111',
    PARTNER: '2222'
};

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
        enum: Object.values(PERMISSIONS), 
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

const ApiKeyModel = model('ApiKey', apiKeySchema);

module.exports = {
    ApiKeyModel,
    apiKey_permissions
};