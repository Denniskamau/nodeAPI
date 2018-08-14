const express = require('express')
const bodyParser = require('body-parser')

const Routes = require('./recources/routes')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const port = process.env.PORT || 8080


app.use('/api/v1', Routes)

app.listen(port)
console.log('server running on port ' + port)