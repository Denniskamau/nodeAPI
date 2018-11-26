const cron = require('node-cron')
const request = require('request')
const Websites = require('../server/models').Websites

const updateDatabase = require('./updateDb')

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
                       // console.log('element', JSON.stringify(element))
                        request('http://'+element.URL, (err,res)=>{
                            
                            if(err != null){
                                element.Status = 'Offline'
                                
                            }
                            else if (err == null){
                                if(res.statusCode != 200){
                                    element.Status = 'Offline'
                                   
                                }
 
                            }else if (res.statusCode != 200){
                                element.Status = 'Offline'
                              
                            }else{
                                element.Status = 'Online'
                               
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
