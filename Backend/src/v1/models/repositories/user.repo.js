const { UserModel } = require("../user.model")

class UserRepository{
    async createUser({name,email,passwordHashed,role}){
        return await UserModel.create({
            user_name :name,
            user_email : email,
            user_role : role,
            user_password : passwordHashed
        })
    }
}

module.exports = new UserRepository()