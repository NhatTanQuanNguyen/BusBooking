const mongoose = require('mongoose')

const DOCUMENT_NAME = 'bus_company'
const COLLECTION_NAME = 'bus_companies'

const busCompanySchema = new mongoose.Schema({
    brand_name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    legal_entity: {
        full_name: String,
        address: String,
        tax_code: String
    },
    service_config: {
        subdomain: {
            type: String,
            unique: true,
            required: true
        },
        api_status: {
            type: String,
            enum: ['enabled', 'disabled', 'revoked'],
            default: 'enabled'
        },
        webhook_url: String
    },
    subscription: {
        plan_name: {
            type: String,
            enum: ['basic', 'pro', 'enterprise'], 
        },
        status: {
            type: String,
            enum: ['active', 'past_due', 'trialing', 'suspended'],
            default: 'active'
        },
        expires_at: Date,
        quotas: {
            max_buses: Number,
            max_routes: Number,
            api_calls_per_month: Number,
            current_month_usage: {
                type: Number,
                default: 0
            }
        }
    },
    settings: {
        timezone: String,
        currency: String,
        supported_bus_types: [String],
        features_enabled: [String],     
    }
},{
    timestamps : true,
    collection : COLLECTION_NAME
})

module.exports = {
    BusCompanyModel: mongoose.model(DOCUMENT_NAME, busCompanySchema)
}