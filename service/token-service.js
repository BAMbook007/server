const jwt = require('jsonwebtoken')
const UserDto = require('../dtos/user-dto')
const tokenModel = require('../models/token-model')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      console.log(userData)
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(user, refreshToken) {
    const tokenData = await tokenModel.findOne({where: {user: user.id}})
    if (tokenData) {
      //console.log("da")
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    //console.log('net')
    //console.log(user.id)
    //console.log(refreshToken)
    
    const token = await tokenModel.create({user: user.id, refreshToken: refreshToken})
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.destroy({where: {refreshToken: refreshToken}});
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({where: {refreshToken: refreshToken}});
    return tokenData;
  }
}

module.exports = new TokenService();