'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  config.name = 'social-login项目';

  config.description = '基于 egg.js的第三方登陆';

  // config.site_logo = '/public/images/cnodejs_light.svg';

  // config.site_icon = '/public/images/cnode_icon_32.png';

  // debug 为 true 时，用于本地调试
  config.debug = true;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527128132884_2965';

  config.host = 'localhost';

  config.session_secret = 'project_secret'; // 务必修改

  // add your config here
  config.middleware = [];

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.ejs': 'ejs'
    }
  };

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public')
  };

  // config.siteFile = {
  //   '/favicon.ico': '/public/images/cnode_icon_32.png',
  // };

  /**
   * @see http://mongodb.github.io/node-mongodb-native/2.2/api/Db.html#createCollection
   */
  config.mongoose = {
    client: {
      url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/social-login-with-egg',
      options: {}
    }
  };

  config.passportLocal = {
    usernameField: 'username',
    passwordField: 'password',
  };

  return config;
};
