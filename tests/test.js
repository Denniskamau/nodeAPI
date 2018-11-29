let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let truncate = require('./truncate');
let createUser = require('./createUser')
let workersTest = require('./workersTest')
chai.use(chaiHttp);




before(()=>{
    truncate();
})

// Test /website
createUser();

//Test workers
workersTest();

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

    //  beforeEach(() => {
    //     truncate();
    //  });

    it('it should return session token when user is registerd',(done)=>{
       
       let user = {
           email: "hackerbay@sample.com",
           password: "SamplePassword",
           phoneNo: "0700184646"
       }
        chai.request(app)
       .post('/user/signup')
       .send(user)
       .end((err,res)=>{
           
           res.should.have.status(200);
           res.body.should.have.property('session')
           done();
       });
       
    }),
        it('it should return error when user with the same email exist', (done) => {

            let user = {
                email: "hackerbay@sample.com",
                password: "SamplePassword",
                phoneNo:"0700184646"
            }
            chai.request(app)
                .post('/user/signup')
                .send(user)
                .end((err, res) => {
                    
                    res.should.have.status(400);
                    res.body.should.have.property('error')
                    done();
                });
           
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
            console.log('login status ', res.status)
            console.log('login body', res.body)
            res.should.have.status(200);
            res.body.should.have.property('session')
            
        });
        done();
    }),
    it('should return 400 if user does not exist', (done)=>{
        console.log('testing 400 login')
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
            done();
        });
        
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

