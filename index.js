require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
  });
const UserModel = require('./models/user-model');
const TokenModel = require('./models/token-model');
const errorMiddleware = require('./middlewares/error-middleware')
const PostModel = require('./models/post-model')
const UserProfileModel = require('./models/userProfile-model')

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  UserModel.sync()
  TokenModel.sync()
  PostModel.sync()
  UserProfileModel.sync()
  try {
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start()