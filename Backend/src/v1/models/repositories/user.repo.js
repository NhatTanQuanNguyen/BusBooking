const { UserModel } = require("../user.model")

class UserRepository{
    async createUser({name,email,passwordHashed,role,keyToken}){
        return await UserModel.create({
            user_name :name,
            user_email : email,
            user_role : role,
            user_password : passwordHashed,
            user_keyToken : keyToken
        })
    }

    async updatePublicKey({email,publicKey}){
        return await UserModel.findOneAndUpdate(
            {user_email : email},
            {
                $set : {
                    user_keyToken: publicKey
                }
            },
            {
                new : true
            }
        ).lean()
    }
    
    async findUserByEmail({email}){
        return await UserModel.findOne({user_email : email}).lean()
    }

    async findUserById({id}){
        return await UserModel.findOne({_id : id}).lean()
    }

    async checkUserExist({email}){
        return UserModel.exists({user_email : email});
    }
}

module.exports = new UserRepository()