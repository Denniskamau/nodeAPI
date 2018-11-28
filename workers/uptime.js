const cron = require('node-cron')
const request = require('request')
const Websites = require('../server/models').Websites
const User = require('../server/models').User
const notification = require('../server/services/twilio/sms')
const updateDatabase = require('./updateDb')
const userPhoneNumber = require ('./getPhoneNumber')

// schedule job with cron-job
module.exports = {
    checkWebsiteUptime(){
        cron.schedule("* * * * *", ()=>{
            // logic to check if a site is up
            // fetch all websites
            Websites.findAll({
                attributes: ['Name','URL','Status','UserId']
            }).then(website => {
                if(website.length > 0){
                    // loop through the array of webstes and for each url 
                    // use request to check for its status code
                    // if it is not 200 then change the status from online to offline
  
                    website.forEach(element => {
                       console.log('element', JSON.stringify(element))
                        var phoneNumber
                       // var countryCode = 254 
                        
                        //For each user get their phone Number from the database
                        User.findById(element.UserId).then((user)=>{
                            if(user){
                              // console.log('user is ', JSON.stringify(user))
                               if (user.phoneNo != null){
                                   phoneNumber = `+${254}${user.phoneNo}`
                               }
                               else {
                                   phoneNumber = `+${254700184646}`
                               }
                                 
                            } 
                        })
                        
                        //Check the server status
                        request('http://'+element.URL, (err,res)=>{
                            
                            if (res != undefined){
                                if(element.Status === 'Online' && res.statusCode != 200){
                                    //Send email that server is offline
                                    element.Status = 'Offline'
                                    console.log(`sending email that server is offline from 1st condition FOR ${element.URL}`, phoneNumber)
                                    // call update function to update the record in the database
                                    updateDatabase.updateDb(element.Name, element.Status)
                                    notification.sendOfflineNotification(phoneNumber,element.URL)
                                }else if (element.Status === 'Offline' && res.statusCode == 200){
                                    //send email that server is online
                                    element.Status = 'Online'
                                    console.log(`sending email that server is online from second condition FOR ${element.URL}`, phoneNumber)
                                    // call update function to update the record in the database
                                    updateDatabase.updateDb(element.Name, element.Status)
                                    notification.sendOnlineNotification(phoneNumber,element.URL)
                                }
                            }
                            else if(element.Status === 'Online' && err != null){
                                //send email that server is offline
                                element.Status = 'Offline'
                                console.log(`sending email that server is offline from 3rd condition FOR ${element.URL}`, phoneNumber)
                                // call update function to update the record in the database
                                updateDatabase.updateDb(element.Name, element.Status)
                                notification.sendOfflineNotification(phoneNumber,element.URL)
                               
                            }
                           
                        })
                    });
                }
               
            })
        })
    }
}
