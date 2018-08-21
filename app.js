const express = require('express')
const logger = require ('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')


const app = express()

const routes = {
    singup: require('./server/services/user/index')
}
require('./server/controllers/signup')(passport);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(logger('dev'))
app.use(passport.initialize());
app.use(passport.session())


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