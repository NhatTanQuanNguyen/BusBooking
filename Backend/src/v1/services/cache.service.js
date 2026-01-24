const {Cache} = require('../databases/redis/init.ioredis')

class CacheService{
    /**
     * @param {import('ioredis').Redis} cache
    */
    constructor() {
        this.cache = null
    }

    get client() {
        if (!this.cache) {
        this.cache = Cache.getInstance()
        }
        return this.cache
    }

    async setCache({key,value}){
        throw new Error('setCache() must be implemented')
    }

    async setCacheTTL({key,value,ttl}){
        throw new Error('setCacheTTL() must be implemented')
    }

    async getCache({key}){
        throw new Error('getCache() must be implemented')
    }

    async deleteCache({key}){
        throw new Error('deleteCache() must be implemented')
    }
    
}


class RedisCacheService extends CacheService {

    async setCache({ key, value }) {
        const data = typeof value === 'string'
        ? value
        : JSON.stringify(value)

        return this.client.set(key, data)
    }

    async setCacheTTL({ key, value, ttl }) {
        const data = typeof value === 'string'
        ? value
        : JSON.stringify(value)

        return this.client.set(key, data, 'EX', ttl)
    }

    async getCache({ key }) {
        const data = await this.client.get(key)
        return data ? JSON.parse(data) : null
    }

    async deleteCache({ key }) {
        return this.client.del(key)
    }
}

module.exports = {
    redisCacheService : new RedisCacheService()
}