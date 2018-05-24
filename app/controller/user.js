'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

    async renderSignup() {
        if (!req.user) {
            res.render('signup', {
                title: 'Sign-up Form',
                messages: req.flash('error')
            });
        } else {
            return res.redirect('/');
        }
    }

    async renderSignin() {
        if (!req.user) {
            res.render('signin', {
                title: 'Sign-in Form',
                messages: req.flash('error') || req.flash('info')
            });
        } else {
            return res.redirect('/');
        }
    };

    async signup() {
        if (!req.user) {
            let user = new User(req.body);
            let message = null;

            user.provider = 'local';

            user.save()
                .then((user) => {
                    // 1. passport.authenticate()方法会自动调用 req.login()方法, 所以我们只需要在注册的时候手动在这里调用一次req.login()方法.
                    // 2. 如果成功, user会被挂到req.user对象上
                    req.login(user, (err) => {
                        if (err) return next(err);
                        return res.redirect('/');
                    });
                })
                .catch((err) => {
                    let message = getErrorMessage(err);

                    req.flash('error', message);
                    return res.redirect('/signup');
                });
        } else {
            return res.redirect('/');
        }
    };

    async signout() {
        req.logout();
        return res.redirect('/');
    };

    async create() {
        let user = new User(req.body);

        user.save()
            .then((user) => res.json(user)) // 这里的user是插入后的新文档
            .catch((err) => {
                if (err) return res.json({
                    message: err.message
                });
            });
    };

    async index() {
        User.find({})
            .exec()
            .then((users) => res.json(users))
            .catch((err) => {
                if (err) return res.json({
                    message: err.message
                });
            });
    };

    async read() {
        return res.json(req.user);
    };

    async update() {
        User.findByIdAndUpdate(req.user._id, req.body) // 注意这里req.user.id 和 req.user._id都是可以的
            .then((user) => res.json(user)) // 注意这里的user是修改之前的 不是修改之后的user
            .catch((err) => {
                if (err) return res.json({
                    message: err.message
                });
            });
    };

    async delete() {
        req.user.remove() //这里直接从req.user删除了
            .then((user) => res.json(user)) // 这里是删除前的user 这是因为在 userByID 方法中, req.user = user 这两个对象的指向是相同的 都是实例 可以删除
            .catch((err) => {
                if (err) return res.json({
                    message: err.message
                });
            });
    };

    async userByID() {
        User.findOne({
                _id: id
            })
            .exec()
            .then((user) => {
                if (!user) {
                    res.json({
                        message: '不存在此用户'
                    });
                }
                req.user = user;
                next();
            })
            .catch((err) => {
                if (err) return res.json({
                    message: err.message
                });
            });
    };
}

module.exports = UserController;