const mongoose = require('mongoose')

const DOCUMENT_NAME = 'subscription_plan'
const COLLECTION_NAME = 'subscription_plans'

const planSchema = new mongoose.Schema({
    plan_name: { 
        type: String, 
        required: true, 
        unique: true 
    }, 
    price: { 
        type: Number, 
        required: true 
    },
    duration_days: { 
        type: Number, 
        default: 30 
    },
    quotas: {
        max_buses: { 
            type: Number, 
            default: 5 
        },
        max_routes: { 
            type: Number, 
            default: 10 
        },
        api_calls_per_month: { 
            type: Number, 
            default: 1000 
        }
    }, 
    isDeleted: { 
        type: Boolean, 
        default: false 
    }
}, { 
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = {
    SubscriptionPlanModel : mongoose.model(DOCUMENT_NAME, planSchema)
}