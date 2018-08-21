const User = require ('../models').User

module.exports = {
    userSignUp(req,res) {
        return User
            // check if thre exist a user with the same credentials
            .find({

            })
    },

    userLogIn(req,res) {

    }
}