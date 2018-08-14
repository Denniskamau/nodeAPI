const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const port = process.env.PORT || 8080
const router = express.Router()

router.get('/', (req,res)=>{
    res.json({message:"you hit the router get"})
})

app.get('/', (req,res)=>{
    res.json({message: "you hit the app get"})
})

app.use('/api/v1', router)

app.listen(port)
console.log('server running on port ' + port)