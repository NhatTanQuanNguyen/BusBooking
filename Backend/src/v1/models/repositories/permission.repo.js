const { PermissionModel } = require("../permission.model")

class PermissionRepository{
    checkPermissionsExist = async ({
        permissions = []
    }) => {
        const uniquePermissions = [...new Set(permissions)]
        const count = await PermissionModel.countDocuments({
            code : {$in: uniquePermissions}
        })

        return count === uniquePermissions.length
    }

    createPermissions = async (codes = []) => {
        console.log({codes})
        if (!Array.isArray(codes) || codes.length === 0) {
            return []
        }

        const permissions = codes.map(code => ({code}))

        console.log({permissions})

        return await PermissionModel.insertMany(permissions)
    }
}

module.exports = {
    PermissionRepository : new PermissionRepository()
}