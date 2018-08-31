const SequelizeMock = require('sequelize-mock');

const dbMock = new SequelizeMock();

module.exports = (DataTypes) => {
    var User = dbMock.define('user', {
    id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {

    });
    return User
}