
const express = require('express')
const websiteController = require('../../controllers').Website
const router = express.Router()


router.post('/add',(req,res)=> websiteController.addWebsite(req,res))
router.get('/list',(req,res)=> websiteController.listWebsite(req,res))

module.exports = router;


