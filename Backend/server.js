//dotenv
require('dotenv').config({
    path : require('path').resolve(__dirname, '../.env')
})
const express = require('express')
const app = express()
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const router = require('./src/v1/routes')
const { Cache } = require('./src/v1/databases/redis/init.ioredis')
const Database = require('./src/v1/databases/mongodb/init.mongodb')
const {appConfig} = require('./src/v1/configs/app.config')

//middleware 
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(morgan('dev'))



//route
app.use(router)

process.title = "BusBookingProcess"

const bootStrap = async () => {
    try{
        Cache.initRedis()
        await Cache.getInstance().ping()

        await Database.initDatabase()
        app.listen(appConfig.port,() => {
            console.log("App running in port " + appConfig.port)
        })
    }catch(error){
        process.exit(1)
    }

}


bootStrap()