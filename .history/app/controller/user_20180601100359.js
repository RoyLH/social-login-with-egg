'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  async renderSignup() {
    const { ctx } = this;

    if (!ctx.user) {
      await ctx.render('signup', {
        title: 'Sign-up Form',
        // messages: req.flash('error')
      });
    } else {
      return ctx.redirect('/');
    }
  }

  async renderSignin() {
    const { ctx } = this;

    if (!ctx.user) {
      await ctx.render('signin', {
        title: 'Sign-in Form',
        // messages: req.flash('error') || req.flash('info')
      });
    } else {
      return ctx.redirect('/');
    }
  }

  async signup() {
    const { ctx, service } = this;

    if (!ctx.user) {
      const body = ctx.request.body;
      body.provider = 'local';

      try {
        const user = await service.user.signup(body);

        ctx.login(user)
          .then(user => {
            ctx.redirect('/');
          })
          .catch(err => {
            return ctx.redirect('/signup');
          });
      } catch (err) {
        ctx.body = {
          success: false,
          message: err.message,
        };
        return ctx.redirect('/signup');

      }
    } else {
      return ctx.redirect('/');
    }
  }

  async signout() {
    const { ctx } = this;

    ctx.logout();
    return ctx.redirect('/');
  }

  async create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const user = await service.user.create(body);

    ctx.body = {
      success: true,
      user,
    };

    return;
  }

  async list() {
    const { ctx, service } = this;
    const user = await service.user.list();

    ctx.body = {
      success: true,
      user,
    };

    return;
  }

  // async read() {
  //     return res.json(req.user);
  // }

  // async update() {
  //     User.findByIdAndUpdate(req.user._id, req.body) // 注意这里req.user.id 和 req.user._id都是可以的
  //         .then((user) => res.json(user)) // 注意这里的user是修改之前的 不是修改之后的user
  //         .catch((err) => {
  //             if (err) return res.json({
  //                 message: err.message
  //             });
  //         });
  // }

  // async delete() {
  //     req.user.remove() //这里直接从req.user删除了
  //         .then((user) => res.json(user)) // 这里是删除前的user 这是因为在 userByID 方法中, req.user = user 这两个对象的指向是相同的 都是实例 可以删除
  //         .catch((err) => {
  //             if (err) return res.json({
  //                 message: err.message
  //             });
  //         });
  // }

  // async userByID() {
  //     User.findOne({
  //             _id: id
  //         })
  //         .exec()
  //         .then((user) => {
  //             if (!user) {
  //                 res.json({
  //                     message: '不存在此用户'
  //                 });
  //             }
  //             req.user = user;
  //             next();
  //         })
  //         .catch((err) => {
  //             if (err) return res.json({
  //                 message: err.message
  //             });
  //         });
  // }
}

module.exports = UserController;
