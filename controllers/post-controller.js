const postService = require("../service/post-service");
const jwt = require('jsonwebtoken')

class PostController {

  async postCreate(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(' ')[1];
      const user = jwt.decode(accessToken);
      const {text, picture} = req.body;
      const userData = await postService.createPost(user, text, picture);
      return res.json(userData);
    } catch(e) {
      next(e);
    }
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await postService.getAllPosts();
      return res.json(posts);
    } catch(e) {
      next(e);
    }
  }

  async getMyPosts(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(' ')[1];
      const user = jwt.decode(accessToken);
      const posts = await postService.getMyPosts(user);
      return res.json(posts);
    } catch(e) {
      next(e);
    }
  }

}

module.exports = new PostController;