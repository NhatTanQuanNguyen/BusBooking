const redisConfig = {
    dev : {
        host :  process.env.REDIS_DEV_HOST || 'localhost',
        port : process.env.REDIS_DEV_PORT || 6379,
        username : process.env.REDIS_DEV_USERNAME || '',
        password : process.env.REDIS_DEV_PASSWORD || ''
    },
    pro : {
        host :  process.env.REDIS_PRO_HOST,
        port : process.env.REDIS_PRO_PORT,
        username : process.env.REDIS_PRO_USERNAME,
        password : process.env.REDIS_PRO_PASSWORD
    }
}

const env = process.env.NODE_ENV || 'dev'

module.exports = {
    redisConfig : redisConfig[env]
}