
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const DownloadedFile = sequelize.define("DownloadedFile", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  downloadDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = DownloadedFile;
