const express = require('express')
const auth = require('../../controllers').singUp


const router = express.Router()
//sign up route
router.post('/signup', (req,res)=> auth.userSignUp(req,res));
// login route
router.post('/login', (req,res) => auth.userLogIn(req,res));