const User = require('../server/models').User

module.exports = {
     getUserPhoneNumber(userId) {
        User.findById(userId).then((user)=>{
            if(user){
                console.log('user is ', JSON.stringify(user))
                return user.phoneNo
            } else {
                console.log('No such user', user)
            }
        })
    }
}