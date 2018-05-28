'use strict';

module.exports = app => {
    const { passport } = app;
    
    // passport.serializeUser((user, done) => {
    //     done(null, user.id);
    // });

    // passport.deserializeUser((id, done) => {
    //     User.findOne({
    //             _id: id
    //         }, '-password -salt')
    //         .exec()
    //         .then((user) => done(null, user))
    //         .catch((err) => done(err));
    // });

    // require('./strategies/local')();
    // require('./strategies/facebook')();
    // require('./strategies/twitter')();
    // require('./strategies/google')();

    const localHandler = async (ctx, { username, password }) => {
        const getUser = username => {
            const { User } = ctx.model;
            return user = User.findOne({
                username: username
            }).exec();
        };

        const existsUser = await getUser(username);

        if (!existsUser) {
            return null;
        }

        return existsUser;
    };

    
    passport.serializeUser(async(ctx, user) => {
        return user; // Tip: this is important, without 'return user', ctx.user is undefined in '/' path.
    });

    passport.deserializeUser(async (ctx, user) => {
        console.log('...............................');
        const { User } = ctx.model;
        User.findOne({
            _id: user._id
        }, '-passport -salt').exec();

        return user;
    });
};