'use strict';

angular.module('core').controller('CoreController', ['$scope', 'Authentication', function ($scope, Authentication) {
    $scope.authentication = Authentication;
}]);