'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  create(user) {
    const { User } = this.ctx.model;
    user = new User(user);

    return user.save();
  }

  list() {
    const { User } = this.ctx.model;
    const users = User.find().exec();

    return users;
  }

  signup(user) {
    const { ctx } = this;
    const { User } = ctx.model;
    user = new User(user);

    return user.save();
  }
}

module.exports = UserService;
