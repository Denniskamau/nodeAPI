const express = require('express')
const passport = require('passport');


const router = express.Router()
router.post('/signup', passport.authenticate('local-signup',{

    successRedirect: '/',
    failureRedirect:'/user/signup'
}))
// login route
//router.post('/login', (req,res) => auth.userLogIn(req,res));

module.exports = router;