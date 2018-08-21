const User = require ('../models').User
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')



const userSignUp =(passport)=> {
        // used to serialize the user for the session
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
        // used to deserialize the user
        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        });

 passport.use('local-signup', new LocalStrategy({
         // by default, local strategy uses username and password, we will override with email
         usernameField: 'email',
         passwordField: 'password',
         passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
     },
     (req, email, password, done)=> {
         if (email)
             email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

         // asynchronous
         process.nextTick(()=> {
             // if the user is not already logged in:
            User.findOne({ 'local.email': email}, (err,user)=>{
                if(err)
                    return done(err)
                if (user){
                    return done(null,false,req.flash('message', 'email exist'))
                } else {
                    let newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = password;

                    // save the user
                    newUser.save((err)=>{
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                }
            })


         });

     }));
 };
        

module.exports = userSignUp;