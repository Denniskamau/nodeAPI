const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
router.post('/add',(req,res)=>{
    // check header or url parameters or post parameters for token
    var auth = req.headers['authorization']; 
    if(!auth) {     // No Authorization header was passed in so it's the first time the browser hit us

    // Sending a 401 will require authentication, we need to send the 'WWW-Authenticate' to tell them the sort of authentication to use
    // Basic auth is quite literally the easiest and least secure, it simply gives back  base64( username + ":" + password ) from the browser
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

    res.send({error:'Authorization required'
    });
}else if (auth){
    
    var tmp = auth.split(' '); 
    const user = tmp[1]
    

}
 

})

router.get('/list', (req,res)=>{
    console.log('/list reached')
})

module.exports = router;