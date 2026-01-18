const winston = require('winston')
const FOLDER_LOG = process.env.LOG_FOLDER_PATH_BE || 'logs'

class MyLogger{
    constructor(){
        const transports = [
            new winston.transports.File({
                filename: `${FOLDER_LOG}/error.log` ,
                level : 'error',
                format: winston.format.combine(
                    winston.format.timestamp({ format: 'HH:mm:ss' }),
                    winston.format.json()
                )
            }),
            new winston.transports.File({
                filename : `${FOLDER_LOG}/info.log`,
                level : 'info',
                format: winston.format.combine(
                    winston.format.timestamp({format : 'HH:mm:ss'}),
                    winston.format.json()
                )
            })
        ]

        if (process.env.NODE_ENV !== 'pro'){
            transports.push(            
                new winston.transports.Console({
                    level : 'info',
                    format: winston.format.combine(
                        winston.format.timestamp({format : 'HH:mm:ss'}),
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                })
            )
        }
        this.logger = winston.createLogger({
            level : 'info',
            transports
        })
    }


    info(message,requestId,metadata = {}){
        this.logger.info(message,{
            requestId,
            ...metadata
        })
    }

    error(message,requestId,metadata = {}){
        this.logger.error(message,{
            requestId,
            ...metadata
        })
    }
}
module.exports = {
    logger : new MyLogger()
}

