const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

const hashPassword = async ({password}) => {
    return await bcrypt.hash(password,SALT_ROUNDS)
}

const comparePasswordHash = async ({password,hashPassword}) => {
    return await bcrypt.compare(password,hashPassword)
}

const checkPermission = (userPermissions = [], requiredPermission) => {
    if (!requiredPermission) return true

    return userPermissions.includes(requiredPermission)
}




module.exports = {
    hashPassword,
    comparePasswordHash,
    checkPermission
}