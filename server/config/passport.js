const User = require('../models').User
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
var bCrypt = require('bcrypt-nodejs');




module.exports = function (passport, user) {
    //var User =user
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

// used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });

    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back

            var generateHash = function(password){
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            }
            console.log("before"+email)
            process.nextTick(function () {
                console.log("after"+ email)
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists

                User.findOne({
                    where: {
                      email:email
                    }
                }).then((err,user)=> {
                    if(err){
                        console.log("error" + err)
                        return done(JSON.stringify(err));
                        
                    }
                    if(user) {
                        console.log("user with "+email+ " exist")
                        return done(null, false, {message:'That email is already taken'});
                    }else {
                                                // if there is no user with that email
                        // create the user
                        let userPassword = generateHash(password);
                        const data =
                        {
                            email:email,
                            password:userPassword
                        }
                        User.create(data).then((newUser,created)=>{
                            if(!newUser){
                                return done(null,false)
                            }
                            if(newUser){
                                return done(null,newUser)
                            }
                        });
                        console.log("new user is "+newUser)
                        // save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                })

            


            });

        }));

};
