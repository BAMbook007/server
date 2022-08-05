const UserProfileModel = require('../models/userProfile-model')


class UserProfileService {
  async create(user, name, lastName, avatar) {
    const userProfile = await UserProfileModel.create({UserId: user.id, name: name, lastName: lastName, avatar: avatar});
    return { userProfile }
  }
}

module.exports = new UserProfileService();