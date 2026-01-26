const winston = require('winston')
const FOLDER_LOG = process.env.LOG_FOLDER_PATH_BE || 'logs'

/**
 * Filter log theo level chính xác
 */
const levelFilter = (level) =>
    winston.format((info) => {
        return info.level === level ? info : false
    })()

    class MyLogger {
    constructor() {
        
        const transports = [
        // ERROR ONLY
        new winston.transports.File({
            filename: `${FOLDER_LOG}/error.log`,
            level: 'error',
            format: winston.format.combine(
            levelFilter('error'),
            winston.format.timestamp({ format: 'HH:mm:ss' }),
            winston.format.json()
            )
        }),

        // WARN ONLY
        new winston.transports.File({
            filename: `${FOLDER_LOG}/warn.log`,
            level: 'warn',
            format: winston.format.combine(
            levelFilter('warn'),
            winston.format.timestamp({ format: 'HH:mm:ss' }),
            winston.format.json()
            )
        }),

        // INFO ONLY
        new winston.transports.File({
            filename: `${FOLDER_LOG}/info.log`,
            level: 'info',
            format: winston.format.combine(
            levelFilter('info'),
            winston.format.timestamp({ format: 'HH:mm:ss' }),
            winston.format.json()
            )
        })
        ]

        // Console chỉ bật khi KHÔNG phải production
        if (process.env.NODE_ENV !== 'production') {
        transports.push(
            new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({ format: 'HH:mm:ss' }),
                winston.format.printf(({ timestamp, level, message, requestId, ...meta }) => {
                return `[${timestamp}] ${level}: ${message} ${requestId ? `(requestId=${requestId})` : ''}`
                })
            )
            })
        )
        }

        this.logger = winston.createLogger({
        level: 'info',
        transports
        })
    }

    info(message, requestId, metadata = {}) {
        this.logger.info(message, {
        requestId,
        ...metadata
        })
    }

    warn(message, requestId, metadata = {}) {
        this.logger.warn(message, {
        requestId,
        ...metadata
        })
    }

    error(message, requestId, metadata = {}) {
        this.logger.error(message, {
        requestId,
        ...metadata
        })
    }
}

module.exports = {
    logger: new MyLogger()
}
