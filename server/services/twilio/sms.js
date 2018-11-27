const config = require('../../config/config')

const client = require('twilio')(
    config.TWILIO_ACCOUNT_SID,
    config.TWILIO_AUTH_TOKEN
)


client.messages
    .create({
        body:'Dento server monitoring application sms test: Mzazi vipi umejishindia matumbo ugali kesho hapo Borabora.Nishtue hii message ikifika .',
        from:'+17194964643',
        to:'+254700184646'
    })
    .then(message => console.log('message sid', message.sid))
    .done()