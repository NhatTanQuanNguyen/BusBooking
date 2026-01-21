const { RoleModel } = require("../role.model")


class RoleRepository{
    constructor(){

    }


    insertRole = async ({role_name,role_permission}) => {
        return await RoleModel.create({
            role_name,
            role_permission
        })
    }

    findAllRole = async () => {
        return await RoleModel.find().lean()
    }
}

module.exports = {
    RoleRepository : new RoleRepository()
}