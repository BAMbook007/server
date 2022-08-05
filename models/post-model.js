const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql'
})


const Post = sequelize.define('Post', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },
  picture: {
    type: DataTypes.STRING
  }
}, {
});

module.exports = Post;