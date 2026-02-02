const mongoose = require('mongoose')
const DOCUMENT_NAME = 'route'
const COLLECTION_NAME = 'routes'

//RouteStop - embedded
const routeStopSchema = new mongoose.Schema(
    {
        order: {
            type: Number,
            required: true
        },
        placeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'location',
            required: true
        },
        stopType: {
            type: String,
            enum: ['PICK_UP', 'DROP_OFF', 'BOTH'],
            required: true
        }
    },
    {_id: false}
)

//RouteMeta - embedded
const routeMetaSchema = new mongoose.Schema(
    {
        tags: {
            type: [String],
            default: []
        },
        description: {
            type: String
        }
    },
    {_id: false}
)

//RoutePolicy - embedded
const routePolicySchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        rules: {
            type: Object,
            default: {}
        }
    },
    {_id: false}
)

//Route - aggregate root
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
            type: Number
        },
        minTime: {
            type: Number
        },
        maxTime: {
            type: Number
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE'],
            default: 'ACTIVE',
            index: true
        },
        stops: {
            type: [routeStopSchema],
            default: []
        },
        policies: {
            type: [routePolicySchema],
            default: []
        },
        meta: {
            type: routeMetaSchema,
            default: {}
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
    isDeleted: 1
})

module.exports = {
    RouteModel: mongoose.model(DOCUMENT_NAME, routeSchema)
}