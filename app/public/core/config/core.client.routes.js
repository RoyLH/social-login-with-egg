'use strict';

angular.module('core').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/core/views/core.client.view.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);