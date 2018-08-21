const express = require('express')
const passport = require('passport');
const userController = require('../../controllers').singUp


const router = express.Router()
// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

module.exports = router;