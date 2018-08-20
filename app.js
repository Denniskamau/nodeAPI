const express = require('express')
//const path = require('path')
const logger = require ('morgan')
const bodyParser = require('body-parser')

//const Routes = require('./recources/routes')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(logger('dev'))

app.get('/', (req, res) => res.status(200).send({
    status:"success",
}));

var data ;
app.post('/data', (req,res) => {
    data = req.body;
    res.json(data);
})

app.get('/data', (req,res) => {
    res.send(data);
})

module.exports = app