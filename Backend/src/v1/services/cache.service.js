const { Cache } = require('../databases/redis/init.ioredis')

class RedisCacheService {
    get cache() {
        return Cache.getInstance()
    }

    async setCache({ key, value }) {
        const data = typeof value === 'string' ? value : JSON.stringify(value)
        return this.cache.set(key, data)
    }

    async setCacheTTL({ key, value, ttl }) {
        const data = typeof value === 'string' ? value : JSON.stringify(value)
        return this.cache.set(key, data, 'EX', ttl)
    }

    async getCache({ key }) {
        const data = await this.cache.get(key)
        if (!data) return null
        return JSON.parse(data)
    }

    async deleteCache({ key }) {
        return this.cache.del(key)
    }
}

module.exports = {
    redisCacheService: new RedisCacheService()
}
