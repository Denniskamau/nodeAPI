
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const config = require('../../config/config')
const Websites = require('../../models').Websites
router.post('/add',(req,res)=>{
    // check header or url parameters or post parameters for token
    var auth = req.headers['authorization']; 
    if(!auth) {     // No Authorization header was passed in so it's the first time the browser hit us
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

    res.send({error:'Authorization required'
    });
    }else{
        let tmp = auth.split(' '); 
        let token = tmp[1].slice(0, -1)
        let decode = jwt.verify(token,config.secret)
        let userId = decode.id 
        // store data in batabase
       
        if(req.body.name === undefined){
            
            res.status(400).send({error:"no data found"})

        }else if(req.body.url === undefined){
            res.status(400).send({error:"no data found"})

        }
        else {
            const website = {
                Name: req.body.name,
                URL: req.body.url,
                UserID:userId,
                Status:'Online'
            }
            Websites.create(website).then((newWebsite)=>{
                if(newWebsite){
                    res.status(200).send({website})
                }
                else {
                    res.status(400).send({message:"Website not added"})
                }
            })
        }

        

    }
 

})

router.get('/list', (req,res)=>{
    var auth = req.headers['authorization']; 
    if(!auth) {     // No Authorization header was passed in so it's the first time the browser hit us
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

    res.send({error:'Authorization required'
    });
}
    else {
        Websites.findAll({
                attributes: ['Name','URL','Status','UserID']
            
        }).then(website => {
            console.log('website', JSON.stringify(website))
            res.send(website)
        })
    }
    
})

module.exports = router;