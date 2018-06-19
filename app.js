'use strict';

module.exports = app => {
  const { passport } = app;

  passport.serializeUser(async (ctx, user) => {
    return user.id;
  });

  passport.deserializeUser(async (ctx, id) => {

    try {
      const user = ctx.model.User.findOne({
        _id: id,
      }, '-salt -password -updated -created').exec();
      return user;

    } catch (e) {
      return null;
    }

  });

  const localHandler = async (ctx, { username, password }) => {
    const getUser = username => {
      return ctx.service.user.getUserByLoginName(username);
    };
    const user = await getUser(username);

    //  用户不存在
    if (!user) return null;

    // 密码不匹配
    if (!user.authenticate(password)) return null;

    // 验证通过
    return user;

  };

  passport.verify(async (ctx, user) => {
    const handler = user.provider === 'local' ? localHandler : '';

    user = await handler(ctx, user);

    return user;
  });
};
