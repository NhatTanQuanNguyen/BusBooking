const { UserModel } = require("../user.model")

class UserRepository {

    async createUser({ name, email, passwordHashed, role }) {
        return await UserModel.create({
            user_name: name,
            user_email: email,
            user_role: role,
            user_password: passwordHashed
        })
    }

    async findByEmail({ email }) {
        return await UserModel.findOne({
            user_email: email
        }).lean()
    }
}

module.exports = new UserRepository()
