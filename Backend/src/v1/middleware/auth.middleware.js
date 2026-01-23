const JwtCore = require('../core/jwt')
const { UnauthorizedError } = require('../core/error.response')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new UnauthorizedError({ message: 'Missing Authorization header' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    throw new UnauthorizedError({ message: 'Missing token' })
  }

  try {
    const payload = JwtCore.verify(token)
    req.user = payload
    next()
  } catch (error) {
    throw new UnauthorizedError({ message: 'Invalid or expired token' })
  }
}

module.exports = { verifyJWT }
