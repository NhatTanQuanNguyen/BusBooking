const mongoose = require('mongoose')
const {dbConfig} = require('../../configs/db.config')
const MONGO_URL = dbConfig.url
console.log(MONGO_URL)
class Database { //mongoose.connect auto singleton
    static async initDatabase() {
        try {
            await mongoose.connect(MONGO_URL)
            console.log('MongoDB connected')
        } catch (error) {
            console.error('MongoDB connection failed:', error.message)
            process.exit(1)
        }
    }
}

module.exports = Database
