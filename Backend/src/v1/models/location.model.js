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
        type: {
            type: String,
            enum: ['CITY', 'DISTRICT', 'STATION'],
            required: true
        },
        address: {
            type: String
        },
        geo: {
            lat: {
                type: Number
            },
            lng: {
                type: Number
            }
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE'],
            default: 'ACTIVE',
            index: true
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

locationSchema.index({name: 1})
locationSchema.index({type: 1})

module.exports = {
    LocationModel: mongoose.model(DOCUMENT_NAME, locationSchema)
}