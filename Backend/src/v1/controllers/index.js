const { OK } = require("../core/success.response")
const { logger } = require("../helpers/logger/myLogger")

const helloController = async (req,res,next) => {
    logger.info("ConCac",req.requestId,{"name" : "Thanh Tan"})
    return new OK({
        data : {"name" : "Thanh Tan"},
        meta : {
            cached : true
        }
    }).send(res)
}


module.exports = {
    helloController
}