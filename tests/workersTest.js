let chai = require('chai');
let uptime = require('../workers/uptime')
let expect = chai.expect
module.exports = function workersTest() {

    describe('checkWebsiteUptime should be defined',()=>{
        it('should find checkWebsiteUptime function',()=>{
            var testFunc = chai.request(uptime.checkWebsiteUptime())
            expect(testFunc).to.not.be.undefined
        })
    })
}
