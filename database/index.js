const { Sequelize } = require('sequelize');

// Nueva instancia de Sequelize
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
});


module.exports = sequelize;
