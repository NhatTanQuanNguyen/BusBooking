const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

module.exports = {
    JWT_SECRET,
    JWT_EXPIRES_IN
}
