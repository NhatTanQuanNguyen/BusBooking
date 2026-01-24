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
const { handleError, generatePermission, generateRequestId } = require('./src/v1/middleware')

//middleware 
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(morgan('dev'))



//route
app.get("/v1/api",(req,res,next)=>{
    res.send("Hello")
})
app.use('/v1/api',generateRequestId,router)


//middleware


//handler error
app.use(handleError)

process.title = "BusBookingProcess"

const bootStrap = async () => {
    try{
        await Cache.initRedis()
        await Cache.getInstance().ping()

        await Database.initDatabase()

        // await generatePermission()
        app.listen(appConfig.port,'0.0.0.0', () => {
            console.log("App running in port " + appConfig.port)
        })
    }catch(error){
        process.exit(1)
    }

}


bootStrap()
