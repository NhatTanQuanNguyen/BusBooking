const userRepo = require("../models/repositories/user.repo");
const UserRepository = require("../models/repositories/user.repo")

/**
 * @param {UserRepository} userRepository
 */
class UserServices{
    constructor(userRepository){
        /**
         * @type {UserRepository}
         */
        this.userRepository = userRepository
    }


    createUser = async ({name,email,password,role}) => {
        
    }
}

module.exports = new UserServices(userRepo)