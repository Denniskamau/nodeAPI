const express = require('express')
const logger = require ('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser');
const config = require('./server/config/config')
const cors = require('cors');

const app = express()

const routes = {
    singup: require('./server/services/user/index'),
    website: require('./server/services/website/index')
}
//models
const models = require('./server/models')
require('./server/config/passport')(passport,models.user);

//BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())

//logger
app.use(logger('dev'))

app.use(cors())

//passport
app.use(session({
        secret: config.secret,
        resave: true,
        saveUninitialized: true
    })); // session secret
app.use(passport.initialize());
app.use(passport.session())
app.use(flash())



app.get('/', (req, res) => res.status(200).send({
    status: "success",
}));

var data;
app.post('/data', (req, res) => {
    console.log(JSON.stringify(typeof req.body.data))
    console.log('lenght is', req.body.data.length)
    if(typeof req.body.data=== "string"){
        if(req.body.data.length == 0){
            res.status(400).send({
                error:"bad request"
            })
        }else{
            data = req.body;
            res.json(data);
        }
    }else{
        res.status(400).send({
        error: "bad request"
    })
    }

})

app.get('/data', (req, res) => {
    console.log('data', typeof data)
    if(typeof data == "object"){
        res.status(200).send(data)
    }else{
        res.status(400).send({
            error: "bad request"
        })
    }
})

// signup route
app.use('/user/', routes.singup);

//website route
app.use('/website/', routes.website);
module.exports = app
