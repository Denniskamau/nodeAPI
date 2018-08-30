// import map from 'lodash/map';
let db = require('../server/models/index');
module.exports = function truncate() {
    // return Promise.all(
        db.User.destroy({where: {}, force: true })
    // );
}