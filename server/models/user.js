module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
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
  }, {});
  User.associate = (models) => {
    // associations can be defined here

  };
  return User;
};