const jwt = require('jsonwebtoken');
const config = require('../../server/config/config')
const Websites = require('../../server/models').Websites
const validUrl = require('check-valid-url')


module.exports = {
    addWebsite(req,res) {
        // check if user is authenticated
        const auth  = req.headers['authorization']
        console.log('auth is ', auth)
        if(auth){
            // check if the required data has been passed

            // get the session token
            
            const tmp = auth.split(' ')
            
            const token = tmp[1].slice(0, -1)
            console.log('session ', token)
            // decode the userid from the token
            const decode = jwt.verify(token,config.secret)
            const UserID = decode.id 
            console.log('user',UserID)
            // check if their is a record with the same info
            if(req.body.name === undefined){
                res.status(400).send({
                    error:"Name not found"
                })
            }else if (req.body.url === undefined){
                res.status(400).send({
                    error:"Url not found"
                })
            }else {
                Websites.findOne ({
                    where: {
                        Name: req.body.name 
                    }
                }).then ((site)=>{
                    if(site){
                        res.status(400).send({
                            error:"A site with the same name exists"
                        })
                    }else{
                        // check for the url
                        Websites.findOne({
                            where: {
                                URL: req.body.url
                            }
                        }).then ((siteUrl)=>{
                            if(siteUrl){
                                res.status(400).send({
                                    error:"A site with the same url exist"
                                })
                            }else {
                            // check if the url is valid
                            if(validUrl.isUrl(req.body.url)){
                                const newSite = {
                                    Name: req.body.name,
                                    URL: req.body.url,
                                    UserId:UserID,
                                    Status:'Online'   
                                }
                                Websites.create(newSite).then((newsite)=>{
                                    if(newsite){
                                        res.status(200).send({newsite})
                                    }else{
                                        res.status(400).send({
                                            error:"website was not added"
                                        })
                                    }
                                })
                            }else{
                               res.status(400).send({
                                   error:"invalid url"
                               }) 
                            }
                            }
                        })
                    }
                })
            }
        }else {
            res.statusCode = 401
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"')
            res.send({error:'Authorization required'})
        }

    },
    listWebsite(req,res) {
        console.log('hit add websti')
        const auth = req.headers['authorization']; 
        if(auth) {     // No Authorization header was passed in so it's the first time the browser hit us
        Websites.findAll({
            attributes: ['Name','URL','Status','UserId']
        
        }).then(website => {
            res.status(200).json(website)
        })
        }else {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        
            res.send({error:'Authorization required'})
        }
    }
}