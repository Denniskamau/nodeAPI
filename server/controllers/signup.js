const User =require('../models').User

// module.exports ={
//     create(req,res) {
//         return User
//             .create({
//                 email: req.body.email,
//                 password: req.body.password
//             })
//             .then((user)=>res.status(201).send(user))
//             .catch((error) => res.status(400).send(error));
//     }
// }