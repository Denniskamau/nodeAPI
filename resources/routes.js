const express = require('express')
const router = express.Router()

const genericHandler = (req,res,next) => {
    res.json({
        status: 'success',
        data: req.body
    })
}

router.post('/people', genericHandler)

router.post('/auth/edit', genericHandler)

router.post('/fee/pay', genericHandler)

module.exports = router