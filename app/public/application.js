'use strict';

var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'ngResource', 'users', 'core', 'articles', 'chat']);

mainApplicationModule.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

// 使用 angular 对象的 jqLite 功能对文当加载事件进行了绑定 
// 该功能执行了 angular.bootstrap() 方法来使用刚创建的应用主模块对新创建的 AngularJs 应用进行手动初始化
angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});