const express = require('express')
const logger = require ('morgan')
const bodyParser = require('body-parser')



const app = express()

const routes = {
    singup: require('./server/services/user/index')
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(logger('dev'))



app.get('/', (req, res) => res.status(200).send({
    status: "success",
}));

var data;
app.post('/data', (req, res) => {
    data = req.body;
    res.json(data);
})

app.get('/data', (req, res) => {
    res.send(data);
})

// signup route
app.use('/user/', routes.singup);
module.exports = app