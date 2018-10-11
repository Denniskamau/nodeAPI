'use strict';
module.exports = (sequelize, DataTypes) => {
  var Websites = sequelize.define('Websites', {
    Name: DataTypes.STRING,
    URL: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    Status: DataTypes.STRING
  }, {});
  Websites.associate = function(models) {
    // associations can be defined here
    Websites.belongsTo(models.User)
  };
  return Websites;
};