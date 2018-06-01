'use strict'

module.exports = app => {

    const { router, controller, config, middleware, passport } = app;

    const { user } = controller;

    const localStrategy = passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    });

    router.get('/users', user.list);
    router.post('/users', user.create);

    // router.get('users/:userId', user.read);
    // router.put('users/:userId', user.update);

    router.get('/signup', user.renderSignup);
    router.post('/signup', user.signup);

    router.get('/signin', user.renderSignin);
    router.post('/signin', localStrategy);

    router.get('/signout', user.signout);

    // app.param('userId', user.userByID);    
};