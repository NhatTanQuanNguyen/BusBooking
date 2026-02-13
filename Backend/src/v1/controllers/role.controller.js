const { OK } = require("../core/success.response");
const RoleServices = require("../services/role.service");

class RoleController{
    constructor(roleServices){
        this.roleServices = roleServices
    }

    createRole = async (req,res,next) => {
        const {roleName,permissions} = req.body;

        console.log({...req.body})
        return new OK({
            message : "OK",
            data : await this.roleServices.createRole({
                role_name : roleName,permissions
            })
        }).send(res)
    }

    getRole = async (req,res,next) => {
        return new OK({
            message : "oke",
            data : "role"
        }).send(res)
    }
}


module.exports = new RoleController(RoleServices)