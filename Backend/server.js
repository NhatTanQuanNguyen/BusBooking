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

const fs = require('fs')
const { monitorEventLoopDelay } = require('perf_hooks')

const h = monitorEventLoopDelay({ resolution: 10 })
h.enable()

const stream = fs.createWriteStream('./logs/event-loop-max-10s.log', {
  flags: 'a'
})

let windowStart = Date.now()
let maxInWindow = 0

setInterval(() => {
  const currentMax = h.max / 1e6 // ms

  if (currentMax > maxInWindow) {
    maxInWindow = currentMax
  }

  const now = Date.now()
  if (now - windowStart >= 10_000) {
    const record = {
      ts: now,
      max_event_loop_ms: Number(maxInWindow.toFixed(2))
    }

    stream.write(JSON.stringify(record) + '\n')

    // reset window
    windowStart = now
    maxInWindow = 0
  }

  h.reset()
}, 1000)

process.on('SIGINT', () => {
  stream.end()
  process.exit(0)
})

//handler error
app.use(handleError)

process.title = "BusBookingProcess"

const bootStrap = async () => {
    try{
        Cache.initRedis()
        
        await Cache.getInstance().ping()

        await Database.initDatabase()

        // await generatePermission()
        app.listen(appConfig.port,() => {
            console.log("App running in port " + appConfig.port)
        })
    }catch(error){
        process.exit(1)
    }

}


bootStrap()
