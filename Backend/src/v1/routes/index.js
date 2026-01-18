
const router = require('express').Router()


router.get("/hello",(req,res,next) => {
    res.send(JSON.stringify({"name" : "Thanh Tan"}))
})

module.exports = router;