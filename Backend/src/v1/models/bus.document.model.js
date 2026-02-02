const mongoose = require('mongoose')
const { Schema } = mongoose

const BusDocumentSchema = new Schema({
    docType: {
        type: String,
        required: true,
        enum: ['registration', 'insurance', 'inspection', 'license']
    },
    docName: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    fileUrl: String,
    status: {
        type: String,
        enum: ['valid', 'expired', 'expiring_soon'],
        default: 'valid'
    }
}, { _id: true })

module.exports = BusDocumentSchema
