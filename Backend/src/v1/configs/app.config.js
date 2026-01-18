const appConfig = {
    dev : {
        port : process.env.APP_DEV_PORT || 3000
    },
    pro : {
        port : process.env.APP_PRO_PORT
    }
}

const env = process.env.NODE_ENV || 'dev'


module.exports = {
    appConfig : appConfig[env]
}