const buildMongoUrl = ({ host, port, username, password, dbName }) => {
    if (username && password) {
        return `mongodb://${username}:${password}@${host}:${port}/${dbName}`
    }
    return `mongodb://${host}:${port}/${dbName}`
}

const dbConfig = {
    dev: {
        host: process.env.DB_DEV_HOST || 'localhost',
        port: process.env.DB_DEV_PORT || 27017,
        username: process.env.DB_DEV_USERNAME || '',
        password: process.env.DB_DEV_PASSWORD || '',
        dbName: process.env.DB_DEV_NAME || ''
    },
    pro: {
        host: process.env.DB_PRO_HOST,
        port: process.env.DB_PRO_PORT,
        username: process.env.DB_PRO_USERNAME,
        password: process.env.DB_PRO_PASSWORD,
        dbName: process.env.DB_PRO_NAME
    }
}

const env = process.env.NODE_ENV || 'dev'

const config = dbConfig[env]

module.exports = {
    dbConfig: {
        ...config,
        url: buildMongoUrl(config)
    }
}
