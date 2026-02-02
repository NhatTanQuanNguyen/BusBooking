const mongoose = require('mongoose')
const { Schema } = mongoose

const BusDocumentSchema = require('./bus.document.model')
const MaintenanceHistorySchema = require('./bus.maintenance.model')

const BusSchema = new Schema({
    busId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    license: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        index: true
    },
    type: {
        type: String,
        required: true,
        enum: ['seat', 'sleeper', 'limousine', 'vip']
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance', 'repair'],
        default: 'active',
        index: true
    },
    model: {
        type: String,
        required: true
    },
    manufactureYear: {
        type: Number,
        required: true,
        min: 1990,
        max: new Date().getFullYear() + 1
    },
    miles: {
        type: Number,
        default: 0,
        min: 0
    },
    regisDate: {
        type: Date,
        required: true
    },
    companyId: {
        type: String,
        required: true,
        index: true
    },
    seatLayoutId: {
        type: String,
        required: true,
        index: true
    },
    seatInfo: {
        totalSeats: Number,
        floors: Number,
        layoutName: String
    },

    documents: [BusDocumentSchema],
    maintenanceHistory: [MaintenanceHistorySchema],

    info: {
        features: [String],
        color: String,
        lastInspection: Date,
        nextInspection: Date,
        averageRating: Number,
        totalTrips: { type: Number, default: 0 },
        imageUrls: [String]
    },

    isDeleted: {
        type: Boolean,
        default: false,
        index: true
    },
    deletedAt: {
        type: Date,
        default: null
    }

}, {
    timestamps: true,
    collection: 'buses'
})

module.exports = mongoose.model('Bus', BusSchema)
