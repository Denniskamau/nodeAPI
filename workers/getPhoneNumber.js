const User = require('../server/models').User

module.exports = {
    getUserPhoneNumber(userId) {
        User.findById(userId).then((user)=>{
            if(user){
                console.log('user is ', user)
                return user
            } else {
                console.log('No such user', user)
            }
        })
    }
}