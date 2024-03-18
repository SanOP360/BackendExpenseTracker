const { DataTypes } = require("sequelize");

const sequelize = require("../database");
const User= require('./User')

const Expense = sequelize.define("Expense", {
  price: {
    type: DataTypes.DECIMAL(10,2),
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
Expense.belongsTo(User, { foreignKey: "userId" });
module.exports = Expense;
