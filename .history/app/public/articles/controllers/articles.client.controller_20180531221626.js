'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Articles', function ($scope, $routeParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;

    $scope.create = function () {
        var article = new Articles({
            title: this.title,
            content: this.content
        });

        article.$save(function (response) {
            $location.path('article/' + response._id);
        }, function(errResponse) {
            $scope.error = errResponse.data.message;
        });
    };

    $scope.find = function () {
        $scope.articles = Articles.query();
    };

    $scope.findOne = function () {
        $scope.article = Articles.get({
            articleId: $routeParams.articleId
        });
    };

    $scope.update = function () {
        $scope.article.$update(function () {
            $location.path('article/' + $scope.article._id);
        }, function (errResponse) {
            $scope.error = errResponse.data.message;
        });
    };

    $scope.delete = function (article) {
        if (article) {
            article.$remove(function (params) {
                for (var i in $scope.articles) {
                    if ($scope.article[i] === article) {
                        $scope.article.splice(i, 1);
                    }
                }
            });
        } else {
            $scope.article.$remove(function () {
                $location.path('articles');
            });
        }
    };
}]);