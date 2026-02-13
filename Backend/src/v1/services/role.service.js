const { RoleRepository } = require("../models/repositories/role.repo")
const {BadRequestError, Conflict, ConflictError} = require("../core/error.response")
const PermissionService = require("./Permission.service")
const { logger } = require("../helpers/logger/myLogger")
class RoleServices{
    constructor(roleRepository,permissionServices){
        this.roleRepository = roleRepository
        this.permissionServices = permissionServices
    }

    createRole = async ({
        role_name,
        permissions = []
    }) => {
        const resultChecking = await this.permissionServices.checkPermissionsExist({permissions});

        if (!resultChecking) throw new BadRequestError({
            message : 'permission not found !!!'
        })


        try{
            const role = await this.roleRepository.insertRole({
                role_name,
                role_permission : permissions
            })

            console.log({role})

            if (!role) throw new BadRequestError({
                message : "Create role failed !!!"
            })

            return {role}
        }catch(error){
            logger.error("Create role failled",{
                error : error.message
            })
            console.log({error})
            throw new ConflictError({
                message : "Create role failled"
            })
        }
    }

    getAllRole = async () => {
        return await this.roleRepository.findAllRole();
    }
}

module.exports = new RoleServices(RoleRepository,PermissionService)