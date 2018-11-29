let chai = require('chai');
let uptime = require('../workers/uptime')
let sms = require('../server/services/twilio/sms')
let expect = chai.expect
module.exports = function workersTest() {

    describe('checkWebsiteUptime should be defined',()=>{
        it('should find checkWebsiteUptime function',()=>{
            var testFunc = chai.request(uptime.checkWebsiteUptime())
            expect(testFunc).to.not.be.undefined
        })
    })

    describe('Check if getUserPhoneNumber is defined', ()=>{
        it('should find getUsePhoneNumber function',()=>{
            let element = {"Name":"Test","URL":"www.test.com","Status":"Online","UserId":"1"}
            var func = chai.request(uptime.getUserPhoneNumber(element)) 
            expect(func).to.not.be.undefined
        })
    })

    describe('Check if sms function is defined', ()=>{
        it('should find sms function ', ()=>{
            let phoneNumber = `+${254700184646}`
            let website = 'www.testwebsite.com'
            let onlineFunc = chai.request(sms.sendOnlineNotification(phoneNumber,website))
            let offlineFunc = chai.request(sms.sendOfflineNotification(phoneNumber,website))
            expect(onlineFunc).to.not.be.undefined
            expect(offlineFunc).to.not.be.undefined
        })
    })

    describe('Check if checkServerStatus is called', ()=>{
        let element = {"Name":"Test","URL":"www.test.com","Status":"Online","UserId":"1"}
        let phoneNumber = `+${254700184646}`
        it('should find checkServerStatus function', ()=>{
            let func = chai.request(uptime.checkServerStatus(element,phoneNumber))
            expect(func).to.not.be.undefined
        })
    })
}
