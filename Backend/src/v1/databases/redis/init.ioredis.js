const IORedis = require('ioredis')
const {redisConfig} = require('../../configs/redis.config')

const REDIS_HOST = redisConfig.host
const REDIS_PORT = redisConfig.port
class Cache {
    static instance = null

    static setEvent = () => {
        if (!this.instance) return

        this.instance.on('connect', () => {
            console.log('Redis connected')
        })

        this.instance.on('error', (err) => {
            console.error('Redis error:', err.message)
        })

        this.instance.on('close', () => {
            console.warn('Redis connection closed')
        })
    }

    static initRedis = () => {
        if (this.instance) return this.instance

        this.instance = new IORedis({
            port: REDIS_PORT,
            host: REDIS_HOST
        })

        this.setEvent()
        return this.instance
    }

    /**
     * 
     * @returns {import('ioredis').Redis;}
     */
    static getInstance = () => {
        if (!this.instance) {
            throw new Error('Cache not initialized. Call Cache.initRedis() first.')
        }
        return this.instance
    }
}

module.exports = {
    Cache
}
