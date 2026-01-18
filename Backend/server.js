const express = require('express')
const app = express()
const cors = require('cors')
const compression = require('compression')
//middleware
const app_port = 8080
app.use(cors())
app.use(compression())
app.use(express.json())


//init database


//route
app.get("/",(req,res,next) => {
    return res.send(JSON.stringify({"Hello" : "Thanh Tan"}))
})

const bootStrap = async () => {
    app.listen(app_port,() => {
        console.log("App running in port " + app_port)
    })
}


bootStrap()