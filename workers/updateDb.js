const Websites = require('../server/models').Websites

module.exports = {
    updateDb(websiteName,Status){
        
        Websites.update(
            {Status: Status},
            {where: {Name:websiteName}}
            ).then(()=>{
                console.log('record updated')
            })
    }
}