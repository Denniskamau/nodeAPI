
let db = require('../server/models/index');
module.exports = function truncate() {
        db.User.destroy({where: {}, force: true })
}