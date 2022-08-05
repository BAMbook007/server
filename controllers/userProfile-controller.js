const userProfileService = require("../service/userProfileService");
const jwt = require('jsonwebtoken')

class UserProfileController {

  async userProfileCreate(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(' ')[1];
      const user = jwt.decode(accessToken);
      const {name, lastName, avatar} = req.body;
      const userProfileData = await userProfileService.create(user, name, lastName, avatar);
      return res.json(userProfileData);
    } catch(e) {
      next(e);
    }
  }
}

module.exports = new UserProfileController;