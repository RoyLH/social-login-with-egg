'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const crypto = require('crypto');

  const UserSchema = new Schema({
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      index: true, // Secondary Index 辅助索引
      match: [ /.+\@.+\..+/, 'Please fill a valid e-mail address' ],
    },
    username: {
      type: String,
      trim: true,
      unique: true, // Unique Index 唯一索引
      required: 'Username is required',
    },
    password: {
      type: String,
      validate: [ password => password.length > 6, 'Password should be longer' ],
    },
    salt: {
      type: String,
    },
    provider: {
      type: String,
      required: 'Provider is required',
    },
    providerId: {
      type: String,
    },
    providerData: {
      type: Schema.Types.Mixed,
    },
    role: {
      type: String,
      enum: [ 'Admin', 'Owner', 'User' ],
    },
    website: {
      type: String,
      set(url) {
        if (!url) return url;
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) return 'http://' + url;
      },
      get(url) {
        if (!url) return url;
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) return 'http://' + url;
      },
    },
  }, {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  });

    // 虚拟字段
  UserSchema.virtual('fullName')
    .get(function() {
      return this.firstName + ' ' + this.lastName;
    })
    .set(function(fullName) {
      const splitName = fullName.split(' ');
      this.firstName = splitName[0] || '';
      this.lastName = splitName[1] || '';
    });

  // 预处理中间件 在操作执行前触发
  UserSchema.pre('save', function(next) {
    if (this.password) {
      this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
      this.password = this.hashPassword(this.password);
      next();
    } else {
      next(new Error('An Error Accured'));
    }
  });

  // 后置处理中间件 在操作执行完成后触发
  UserSchema.post('save', function() {
    if (this.isNew) { // 用isNew判断是创建操作还是更新操作
      console.log('A new user was crated.');
    } else {
      console.log('A user updated is details.');
    }
  });

  UserSchema.statics = {
    findOneByUsername(username, callback) {
      this.findOne({
        username: new RegExp(username, 'i'),
      }, callback);
    },
    findUniqueUsername(username, suffix, callback) {
      const possibleUsername = username + (suffix || '');

      _this.findOne({
        username: possibleUsername,
      })
        .exec()
        .then(user => {
          if (!user) {
            callback(possibleUsername);
          } else {
            return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
          }
        })
        .catch(() => {
          callback(null);
        });
    },
  };

  UserSchema.methods = {
    hashPassword(password, salt) {
      return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
    },
    authenticate(password) {
      return this.password === this.hashPassword(password);
    },
  };

  UserSchema.set('toJSON', { // 一下两个设置中的任何一个 都会使整个res.json()的返回文档中多出一个id属性 其值是等于_id属性的
    getters: true, // 在res.json()等方法中, 文档转换为JSON默认不会执行getter修饰符的操作, 所以这里保证在这种情况下强制执行getter修饰符
    virtuals: true, // 在toJSON方法的时候, 能支持虚拟属性功能
  });

  return mongoose.model('User', UserSchema, 'users');
};
