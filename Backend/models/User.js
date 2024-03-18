const { DataTypes } = require("sequelize"); // Corrected import

const sequelize = require("../database");

const User = sequelize.define("Users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
});

module.exports = User;