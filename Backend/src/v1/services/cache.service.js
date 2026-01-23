const {Cache} = require('../databases/redis/init.ioredis')

class CacheService{
    /**
     * @param {import('ioredis').Redis} cache
    */
    constructor(cache){
        this.cache = cache
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


class RedisCacheService extends CacheService{

    constructor(cache){
        super(cache)
        
    }

    async setCache({key,value}){
        const data = typeof value === 'string'
                    ?value
                    : JSON.stringify(value)
        return this.cache.set(key,data)
    }

    async setCacheTTL({key,value,ttl}){
        const data = typeof value === 'string'
                    ?value
                    : JSON.stringify(value)
        return this.cache.set(key,data,'EX',ttl)
    }

    async getCache({key}){
        const data = await this.cache.get(key)
        if (!data) return null;
        return JSON.parse(data)
    }

    async deleteCache({key}){
        return this.cache.del(key)
    }

}

module.exports = {
    redisCacheService : new RedisCacheService()
}