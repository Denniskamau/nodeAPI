const express = require('express')
const passport = require('passport');
const userController = require('../../controllers').singUp
const jwt = require('jsonwebtoken');
const config = require('../../config/config')


const router = express.Router()
// process the signup form
router.post('/signup', (req,res)=>{
    passport.authenticate('local-signup', (err,user)=>{
        if (user){
            if(user.error){
                console.log('user has error')
                res.status(400).json(user)
            }
            const token = jwt.sign({id:user.id}, config.secret);
            res.json({session:token})
        }
    })(req,res);
})
//login route
router.post('/login', (req, res) => {
    passport.authenticate('local-login',(err,user)=>{
        if(user){
            console.log("Test invalid password"+JSON.stringify(user));
            if (user.error){
                console.log('user test ' + JSON.stringify(user))
                res.status(400).json(user)
            }
            const token = jwt.sign({id:user.id}, config.secret);
            //res.status(200);
            res.json({session:token})
            

        }
    })(req,res);
    
});


module.exports = router;