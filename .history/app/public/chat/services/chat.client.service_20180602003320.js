'use strict';

angular.module('chat').service('Socket', [ 'Authentication', '$location', '$timeout', function(Authentication, $location, $timeout) {
  // 由于AngularJS 应用是延时加载的 因此Socket服务只有在请求时才加载 这样可以防止未验证的用户使用Socket服务
  // 这样可以防止未验证的用户使用socket服务
  if (Authentication.user) {
    this.socket = io();
  } else {
    $location.path('/');
  }
  // 当用户通过了身份验证 Socket 服务便可以通过调用Socket.io的io()方法来设置socket属性

  // 下面封装了 on() emit() removeListener()方法
  this.on = function(eventName, callback) {
    if (this.socket) {
      this.socket.on(eventName, function(data) {
        $timeout(function() {
          callback(data);
        });
        // 这里使用了AngualrJS的一个小技巧 $timeout 服务
        // 这里需要解决的一个重要问题是 AngularJS的双向数据绑定只支持在框架内执行的方法
        // 因此除非将第三方的事件通知给AngularJS编译器 否则AngularJS编译器无法获知这些事件在数据模型中带来的变化
        // 在这个聊天室中 集成到服务的socket客户端是一个第三方库 因此任何来自于socket客户端的事件都不会触发AngularJS的绑定操作
        // 为解决这一问题 可以借助 $apply方法和$digest方法 但是这又常常会导致里一个错误：
        // 即上一个$digest还没执行完成 下一个又开始执行了
        // 一个较好的办法就是使用$timeout() $timeout()服务 window.setTimeout()方法的AngularJS封装
        // 因此直接调用$timeout()方法 不需要传入参数 便可以解决绑定问题 同时也不影响用户体验
      });
    }
  };

  this.emit = function(eventName, data) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  };

  this.removeListener = function(eventName) {
    if (this.socket) {
      this.socket.removeListener(eventName);
    }
  };
} ]);
