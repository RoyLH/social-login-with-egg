'use strict';

angular.module('core').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'public/core/views/core.client.view.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);