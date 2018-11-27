//const config = require('../../config/config')

const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)


module.exports = {
    sendOfflineNotification(phoneNumber){
        client.messages
        .create({
            body:'server monitoring application.This is to notify you that your server is offline.',
            from:'+17194964643',
            to:phoneNumber
        })
        .then(message => console.log('message sid', message.sid))
        .done()
    },

    sendOnlineNotification(phoneNumber){
        client.messages
        .create({
            body:'server monitoring application.This is to notify you that your server is back online.',
            from:'+17194964643',
            to:phoneNumber
        })
        .then(message => console.log('message sid', message.sid))
        .done()
    }
}
