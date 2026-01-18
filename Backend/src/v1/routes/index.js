const { logger } = require('../helpers/logger/myLogger');
const { generateRequestId } = require('../middleware');

const router = require('express').Router()


router.get("/hello",generateRequestId,(req,res,next) => {
    logger.info("ConCac",req.requestId,{"name" : "Thanh Tan"})
    res.send(JSON.stringify({"name" : "Thanh Tan"}))
})

module.exports = router;