const Websites = require('../server/models').Websites

module.exports = {
    updateDb(websiteName,element){
        
        Websites.update(
            {Status: element.Status},
            {where: {Name:websiteName}}
            ).then(()=>{
                console.log('record updated')
            })
    }
}