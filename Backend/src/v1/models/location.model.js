const mongoose = require('mongoose')
const DOCUMENT_NAME = 'location'
const COLLECTION_NAME = 'locations'

const locationSchema = new mongoose.Schema(
    {
        busCompanyId: {
            type: String,
            required: true,
            index: true
        },

        code: {                
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE'],
            default: 'ACTIVE',
        },
        isDeleted: {
            type: Boolean,
            default: false,
            select: false
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)

locationSchema.index(
  { busCompanyId: 1, code: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } }
)

locationSchema.index({name: 1})

module.exports = {
    LocationModel: mongoose.model(DOCUMENT_NAME, locationSchema)
}