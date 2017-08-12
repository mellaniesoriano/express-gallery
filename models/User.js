module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return User;
};