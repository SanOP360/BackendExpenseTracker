const { DataTypes } = require("sequelize");

const sequelize = require("../database");

const Expense = sequelize.define("Expense", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  categories: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = Expense;
