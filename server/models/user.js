
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    title: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
