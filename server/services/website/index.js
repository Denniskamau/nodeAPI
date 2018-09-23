const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const config = require('../../config/config')
router.post('/add',(req,res)=>{
    // check header or url parameters or post parameters for token
    var auth = req.headers['authorization']; 
    if(!auth) {     // No Authorization header was passed in so it's the first time the browser hit us
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

    res.send({error:'Authorization required'
    });
}else if (auth){
    
    let tmp = auth.split(' '); 
    let token = tmp[1].slice(0, -1)
    let decode = jwt.verify(token,config.secret)
    let userId = decode.id 
    // store data in batabase
    const website = {
        name: req.body.name,
        url: req.body.url
    }
    res.send(website)

}
 

})

router.get('/list', (req,res)=>{
    console.log('/list reached')
})

module.exports = router;