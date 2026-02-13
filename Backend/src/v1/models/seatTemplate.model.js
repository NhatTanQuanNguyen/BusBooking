const mongoose = require('mongoose')
const { Schema } = mongoose

const SeatTemplateSchema = new Schema({
    seatNumber: {
        type: String,
        required: true
    },
    floor: {
        type: Number,
        required: true,
        min: 1
    },
    positionRow: {
        type: Number,
        required: true
    },
    positionColumn: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'active'
    },
    seatType: {
        type: String,
        enum: ['seat', 'sleeper', 'vip'],
        default: 'seat'
    },

}, { _id: true })

module.exports = SeatTemplateSchema
