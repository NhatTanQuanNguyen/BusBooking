const mongoose = require('mongoose')
const DOCUMENT_NAME = 'route'
const COLLECTION_NAME = 'routes'

const routeSchema = new mongoose.Schema(
    {
        busCompanyId: {
            type: String,
            required: true,
            index: true
        },
        originId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'location',
            required: true
        },
        destinationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'location',
            required: true
        },
        code: {
            type: String,
            required: true,
            immutable: true
        },
        name: {
            type: String,
            required: true
        },
        distanceKm: {
            type: Number,
            default: null
        },
        minTime: {
            type: Number,
            default: null
        },
        maxTime: {
            type: Number,
            default: null
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE'],
            default: 'ACTIVE',
            index: true
        },
        stops: {
            type: String,
            trim: true
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

routeSchema.index(
  { busCompanyId: 1, code: 1 },
  { unique: true }
)

routeSchema.index({
    busCompanyId: 1,
    originId: 1,
    destinationId: 1,
    isDeleted: 1,
    status: 1
})

module.exports = {
    RouteModel: mongoose.model(DOCUMENT_NAME, routeSchema)
}