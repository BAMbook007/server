const { Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql'
})


const Token = sequelize.define('Token', {
  user: {
    type: DataTypes.INTEGER,
  },
  refreshToken: {
    type: DataTypes.STRING,
    require: true
  }
}, {
});
module.exports = Token;