'use strict';
module.exports = (sequelize, DataTypes) => {
  var Websites = sequelize.define('Websites', {
    Name: DataTypes.STRING,
    URL: DataTypes.STRING,
    Status: DataTypes.STRING,
    UserID: DataTypes.INTEGER
  }, {});
  Websites.associate = function(models) {
    // associations can be defined here
    Websites.belongsTo(models.User)
  };
  return Websites;
};