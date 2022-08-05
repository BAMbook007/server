const { Sequelize, DataTypes} = require('sequelize');
const Post = require('./post-model');
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql'
})


const UserProfile = sequelize.define('UserProfile', {
  name: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  avatar: {
    type: DataTypes.STRING,
  }
}, {
});

UserProfile.hasMany(Post);
Post.belongsTo(UserProfile);

module.exports = UserProfile;