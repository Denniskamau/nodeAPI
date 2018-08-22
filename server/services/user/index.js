const express = require('express')
const passport = require('passport');
const userController = require('../../controllers').singUp
const jwt = require('jsonwebtoken');


const router = express.Router()
// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/user/signup', // redirect to the secure profile section
    failureRedirect: '/data', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.get('/signup', (req, res) => {
     //var token = jwt.sign({id: newUser.id }, 'server secret');
    //res.json(200,{token:token});
    
})
//login route
router.post('/login', passport.authenticate('local-login',{
    successFlash:true,
    failureRedirect:'/data',
    successRedirect:'/user/signup'
}))


module.exports = router;