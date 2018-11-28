const Websites = require('../server/models').Websites

module.exports = {
    // update the database when status of the server has changed
    updateDb(websiteName,Status){
        
        Websites.update(
            {Status: Status},
            {where: {Name:websiteName}}
            ).then(()=>{
                console.log('record updated')
            })
    }
}