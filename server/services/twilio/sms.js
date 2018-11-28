const config = require('../../config/config')
require('dotenv').load();
const client = require('twilio')(
    config.TWILIO_ACCOUNT_SID,
    config.TWILIO_AUTH_TOKEN
)


module.exports = {
    sendOfflineNotification(phoneNumber,website){
        console.log('called offline')
        client.messages
        .create({
            body:`server monitoring application.This is to notify you that your server ${website} is offline.`,
            from:'+17194964643',
            to:phoneNumber
        })
        .then(message => console.log('message sid', message.sid))
        .done()
    },

    sendOnlineNotification(phoneNumber,website){
        client.messages
        .create({
            body: `server monitoring application.This is to notify you that your server ${website} is back online.`,
            from:'+17194964643',
            to: `${phoneNumber}`
        })
        .then(message => console.log('message sid', message.sid))
        .done()
    }
}
