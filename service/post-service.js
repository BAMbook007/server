//const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const PostModel = require('../models/post-model');
const ApiError = require('../exceptions/api-error');
const User = require('../models/user-model')


class PostService {
  async createPost(user, text, picture) {
    const post = await PostModel.create({UserProfileId: user.id, text: text, picture: picture});
    return { post }
  }
  
  async getAllPosts() {

  const posts = await PostModel.findAll({
    where: {},
    include:[{
      association: 'UserProfileId'
    }]
  });
  return posts;
}

  async getMyPosts(user) {
    const posts = await PostModel.findAll({
      where: {UserId: user.id},
      include:[{
        association: 'User'
      }]
    });
    return posts;
  }
}

module.exports = new PostService();
