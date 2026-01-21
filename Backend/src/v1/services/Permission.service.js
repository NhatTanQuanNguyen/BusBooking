
const { logger } = require("../helpers/logger/myLogger")
const { PermissionRepository } = require("../models/repositories/permission.repo")

class PermissionServices{
    constructor(permissionRepository){
        this.permissionRepository = permissionRepository
    }

    checkPermissionsExist= async ({permissions = []}) => {
        return await this.permissionRepository.checkPermissionsExist({permissions})
    }

    generatePermission = async () => {
        const codes = [
            'role:read',
            'role:create',
            'role:update',
            'role:delete'
        ]
        const result =  await this.permissionRepository.createPermissions(codes)

        logger.info("Genarate permission",{
            result
        })
        console.log({result})
        return result
    }
}

module.exports = new PermissionServices(PermissionRepository)