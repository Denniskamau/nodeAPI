const cron = require('node-cron')
const request = require('request')
const Websites = require('../server/models').Websites
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

                        
                        request('http://'+element.URL, (err,res)=>{
                            
                            if(err != null){
                                if(element.Status = 'Online'){
                                    console.log('error calling')
                                    element.Status = 'Offline'
                                    const phoneNumber = userPhoneNumber.getUserPhoneNumber(element.userId)
                                    console.log('new user details', phoneNumber)
                                    //notification.sendOfflineNotification('+254700184646', element.URL)
                                }
                                else {
                                    element.Status = 'Offline'
                                }
                                
                               
                                
                            }
                            // else if (err == null){
                            //     if(res.statusCode != 200){
                            //         if(element.Status = 'Online'){
                            //             console.log('not 200 calling')
                            //             element.Status = 'Offline'
                            //             notification.sendOfflineNotification('+254700184646', element.URL)
                            //         }
                            //         else {
                            //             element.Status = 'Offline'
                            //         }
                                   
                            //     }
 
                            // }else if (res.statusCode != 200){
                            //     if(element.Status = 'Online'){
                            //         console.log('second not 200 calling')
                            //         element.Status = 'Offline'
                            //        // notification.sendOfflineNotification('+254700184646', element.URL)
                            //     }
                            //     else {
                            //         element.Status = 'Offline'
                            //     }
                              
                            //}
                            else{
                                if(element.Status = 'Offline'){
                                    console.log('online calling')
                                    element.Status = 'Online'
                                    //notification.sendOnlineNotification('+254700184646', element.URL)
                                }
                                else {
                                    element.Status = 'Online'
                                }
                               
                            }
                            // call update function to update the record in the database
                            updateDatabase.updateDb(element.Name, element)
                        })
                    });
                }
               
            })
        })
    }
}
