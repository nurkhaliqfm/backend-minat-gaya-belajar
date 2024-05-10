const { Sequelize } = require("sequelize");
const config = require("../config/config.json");

const env = process.env.NODE_ENV || "development";
const currentConfig = config[env];

const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,

  {
    timezone: currentConfig.timezone,
    host: currentConfig.host,
    dialect: currentConfig.dialect,
  }
);

module.exports = sequelize;
