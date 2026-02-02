const mongoose = require('mongoose')
const { Schema } = mongoose

const MaintenanceHistorySchema = new Schema({
    maintainDate: {
        type: Date,
        required: true
    },
    completedDate: Date,
    maintainType: {
        type: String,
        required: true,
        enum: ['periodic', 'repair', 'emergency', 'inspection']
    },
    cost: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    performBy: {
        type: String,
        required: true
    },
    notes: String,
    items: [{
        name: String,
        cost: Number,
        description: String
    }]
}, { _id: true, timestamps: true })

module.exports = MaintenanceHistorySchema
