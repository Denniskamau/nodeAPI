let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let truncate = require('./truncate');

chai.use(chaiHttp);

var session 
describe('/GET', ()=>{
    it('is should get the index', (done)=>{
        chai.request(app)
        .get('/')
        .end((err,res)=>{
            res.should.have.status(200)
            res.should.be.json;
            res.body.should.have.property('status')
            done();
        });
    });
});
describe('/GET data', () => {
    it('it should return error if data is empty', (done) => {
        chai.request(app)
            .get('/data')
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('error').eql("bad request")
                done();
            });
    });
});
describe('/POST data', ()=>{
    it('it should post data ', (done)=>{
        let dataString = {"data":"Any string"}
        chai.request(app)
        .post('/data')
        .send(dataString)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').eql("Any string");
            done();
        });
    });
});

describe('/POST data', ()=>{
    it('it should return 400 status for integer ', (done)=>{
        let dataInt = { "data": 3 }
        chai.request(app)
        .post('/data')
        .send(dataInt)
        .end((err,res)=>{
            res.should.have.status(400);
            res.body.should.have.property('error');
            done();
        });
    });
});

describe('/POST data', () => {
    it('it should return 400 status for empty data ', (done) => {
        let dataInt = {"data": ""}
        chai.request(app)
            .post('/data')
            .send(dataInt)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error');
                done();
            });
    });
});

describe('/GET data', ()=>{
    it('it should get data object', (done)=>{
        chai.request(app)
        .get('/data')
        .end((err,res)=>{
            res.should.have.status(200);
            res.should.be.json;
            done();
        });
    });
});

describe('/POST /user/signup', ()=>{

     beforeEach(() => {
        truncate();
     });

    it('it should return session token when user is registerd',(done)=>{
       
       let user = {
           email: "hackerbay@sample.com",
           password: "SamplePassword"
       }
        chai.request(app)
       .post('/user/signup')
       .send(user)
       .end((err,res)=>{
           
           res.should.have.status(200);
           res.body.should.have.property('session')
       });
       done();
    }),
        it('it should return error when user with the same email exist', (done) => {

            let user = {
                email: "hackerbay@sample.com",
                password: "SamplePassword"
            }
            chai.request(app)
                .post('/user/signup')
                .send(user)
                .end((err, res) => {
                    
                    res.should.have.status(400);
                    res.body.should.have.property('session')

                });
            done();
        })
});

describe('/POST /user/login', ()=>{
 
    it('it should return session token when user is logedin', (done)=>{
        let user = {
            email: "hackerbay@sample.com",
            password: "SamplePassword"
        }
        chai.request(app)
        .post('/user/login')
        .send(user)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property('session')
        });
        done();
    }),
    it('should return 400 if user does not exist', (done)=>{
        let user = {
            email:"random@random.com",
            password: "random"
        }
        chai.request(app)
        .post('/user/login')
        .send(user)
        .end((err,res)=>{
            res.should.have.status(400);
            res.body.should.have.property('error')
        });
        done();
    })

});

describe(' /POST /website/add check that all parameters are there', ()=>{
    it('should return 200 and the data object when correct parameters are given', (done)=>{
        let website = {
            name:'testing',
            url:'www.testing.com'
        }
        chai.request(app)
        .post('/website/add')
        .set('authorization',"'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImlhdCI6MTUzNzcyMjYzN30.eUgrbDZRxQMADN3LgQZByfy9FVV8onrbUDclpYIkIjA'" )
        .send(website)
        .end((err,res)=>{
            res.should.have.status(200)
            res.should.be.json;
            res.body.should.have.property('status')
            
        })
        done();
    })

})


describe('/POST /website/add make sure the user is authorised',()=>{
    it('should return 401 when Authorization headers are not present',(done)=>{
        let website = {
            name:'test',
            url: 'www.test.com'
        }
        chai.request(app)
        .post('/website/add')
        .send(website)
        .end((err,res)=>{
            console.log(res.status)
            res.status.should.eql(401);
            res.body.should.have.property('error')
            
        })
        done();
    });

});


    


describe('should check that correct data is provided', ()=>{
    it('should return 400 when no name is provided', (done)=>{
        let website = {
            url:'www.testing.com'
        }
        chai.request(app)
        .post('/website/add')
        .set('authorization',"'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImlhdCI6MTUzNzcyMjYzN30.eUgrbDZRxQMADN3LgQZByfy9FVV8onrbUDclpYIkIjA'" )
        .send(website)
        .end((err,res)=>{
            console.log('status', res.body)
            res.status.should.eql(400);
            res.body.should.have.property('error')
            
        })
        done();
    })
        // it('should return 400 when no url is provided', (done)=>{
    //     let website = {
    //         name:'test'
    //     }
    //     chai.request(app)
    //     .post('/website/add')
    //     .set('authorization',"'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImlhdCI6MTUzNzcyMjYzN30.eUgrbDZRxQMADN3LgQZByfy9FVV8onrbUDclpYIkIjA'" )
    //     .send(website)
    //     .end((err,res)=>{
    //         console.log(res.status)
    //         res.should.have.status(400);
    //         res.body.should.have.property('error')
            
    //     })
    //     done(); 
    // })
})
    // it('should return 400 when url is invalid',(done)=>{
    //     let website = {
    //         name:'test',
    //         url: 'testingtesting'
    //     }
    //     chai.request(app)
    //     .post('/website/add')
    //     .send(website)
    //     .end((res)=>{
    //         res.should.have.status(400)
    //     })
    //     done();
    // }),
    // it('should return 400 when same name is provides',(done)=>{
    //     let website = {
    //         name:'test',
    //         url: 'testingtesting'
    //     }
    //     chai.request(app)
    //     .post('/website/add')
    //     .send(website)
    //     .end((res)=>{
    //         res.should.have.status(400)
    //     })
    //     done();
    // }),
    // it('should return 400 when same url is provided',(done)=>{
    //     let website = {
    //         name:'test',
    //         url: 'testingtesting'
    //     }
    //     chai.request(app)
    //     .post('/website/add')
    //     .send(website)
    //     .end((res)=>{
    //         res.should.have.status(400)
    //     })
    //     done();
    // }),
    // it('should return 401 when user is not authorised',(done)=>{
    //     let website = {
    //         name:'test',
    //         url: 'testingtesting'
    //     }
    //     chai.request(app)
    //     .post('/website/add')
    //     .send(website)
    //     .end((res)=>{
    //         res.should.have.status(401)
    //     })
    //     done();
    // })
