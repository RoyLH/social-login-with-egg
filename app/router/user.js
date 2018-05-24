'use strict'

module.exports = app => {

    const { router, controller, passport } = app;

    router.get('/users', controller.user.index);
    router.get('/users', controller.user.create);

    router.get('users/:userId', controller.user.read);
    router.put('users/:userId', controller.user.update);

    router.get('/signup', controller.user.renderSignup);
    router.post('/signup', controller.user.signup);

    router.get('/signin', controller.user.renderSignin);
    router.post('/signin', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    }));

    router.get('/signout', controller.user.signout);

    app.param('userId', controller.user.userByID);    

};