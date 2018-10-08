
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let truncate = require('./truncate');


module.exports = function createUser() {
    describe('get session token', ()=>{
        it('should signup user and get the session token',(done)=>{
            let user = {
                email:"test@gmail.com",
                password:"test"
            }
            let website = {
                name:"testing",
                url:"www.test.com"

            }
            
            chai.request(app)
            .post('/user/signup')
            .send(user)
            .end((err,res)=>{
                console.log('response', res.body.session)
                //res.should.have.status(200) 
                chai.request(app)
                .post('/website/add')
                .set({'authorization':'Bearer '+res.body.session + '/'})
                .send(website)
                .end((err,res)=>{
                    res.should.have.status(200)
                    res.body.should.have.property('newsite')
                    done();
                }) 
            
            })
           
        })

    })



    describe('check for data that is inputed', ()=>{
        it('should return error when same site name is given',(done)=>{
            let user = {
                email:"test@gmail.com",
                password:"test"
            }
            let website = {
                name:"testing",
                url:"www.test.com"

            }
            
            chai.request(app)
            .post('/user/login')
            .send(user)
            .end((err,res)=>{
                console.log('response', res.body.session)
                //res.should.have.status(200) 
                chai.request(app)
                .post('/website/add')
                .set({'authorization':'Bearer '+res.body.session + '/'})
                .send(website)
                .end((err,res)=>{
                    
                    res.should.have.status(400)
                    res.body.should.have.property('error')
                    done();
                }) 
            
            })
          
        })

        it('should return error when same site url is given',(done)=>{
            let user = {
                email:"test@gmail.com",
                password:"test"
            }
            let website = {
                name:"test",
                url:"www.test.com"

            }
            
            chai.request(app)
            .post('/user/login')
            .send(user)
            .end((err,res)=>{
                console.log('response', res.body.session)
                //res.should.have.status(200) 
                chai.request(app)
                .post('/website/add')
                .set({'authorization':'Bearer '+res.body.session + '/'})
                .send(website)
                .end((err,res)=>{
                   
                    res.should.have.status(400)
                    res.body.should.have.property('error')
                    done();
                }) 
            
            })
           
        })

        it('should return error when name is not given',(done)=>{
            let user = {
                email:"test@gmail.com",
                password:"test"
            }
            let website = {
                url:"www.test.com"

            }
            
            chai.request(app)
            .post('/user/login')
            .send(user)
            .end((err,res)=>{
                console.log('response', res.body.session)
                //res.should.have.status(200) 
                chai.request(app)
                .post('/website/add')
                .set({'authorization':'Bearer '+res.body.session + '/'})
                .send(website)
                .end((err,res)=>{
                    
                    res.should.have.status(400)
                    res.body.should.have.property('error')
                    done();
                }) 
            
            })
            

           
        })

        it('should return error when url is  not given',(done)=>{
            let user = {
                email:"test@gmail.com",
                password:"test"
            }
            let website = {
                name:"testingurl"

            }
            
            chai.request(app)
            .post('/user/login')
            .send(user)
            .end((err,res)=>{
                console.log('response', res.body.session)
                //res.should.have.status(200) 
                chai.request(app)
                .post('/website/add')
                .set({'authorization':'Bearer '+res.body.session + '/'})
                .send(website)
                .end((err,res)=>{
                    
                    res.should.have.status(400)
                    res.body.should.have.property('error')
                    done();
                }) 
            
            })
           
        })

        it('should return error invalid url is  given',(done)=>{
            let user = {
                email:"test@gmail.com",
                password:"test"
            }
            let website = {
                name:"testingurlvalidity",
                url:"testing"

            }
            
            chai.request(app)
            .post('/user/login')
            .send(user)
            .end((err,res)=>{
                console.log('response', res.body.session)
                //res.should.have.status(200) 
                chai.request(app)
                .post('/website/add')
                .set({'authorization':'Bearer '+res.body.session + '/'})
                .send(website)
                .end((err,res)=>{
                    res.should.have.status(400)
                    res.body.should.have.property('error')
                    done();
                }) 
            
            })
           
        })


    })
}