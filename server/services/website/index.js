const express = require('express')
const router = express.Router()

router.post('/add',(req,res)=>{
    console.log('/add reached',req.body)
    res.status(200).send({
        body:req.body
    })
})

router.get('/list', (req,res)=>{
    console.log('/list reached')
})

module.exports = router;