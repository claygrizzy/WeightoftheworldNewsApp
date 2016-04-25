/* jslint browser: true, esnext: true */

let mainApp = angular.module('WorldNewsApp', ['ngRoute']);

mainApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/main', {
            controller: 'MainViewController',
            templateUrl: 'pageviews/main.html',
        })
        .when('/interest', {
            controller: 'InterestViewController',
            templateUrl: 'pageviews/interest.html',
        })
        .when('/saved', {
            controller: 'SavedViewController',
            templateUrl: 'pageviews/saved.html',
        });
}]);

mainApp.controller('MainViewController', ['$scope', 'NewsService', function ($scope, NewsService) {
    function x(y){
        $scope.breakingNews = y;
        console.log('the y call', y);
    }
    $scope.breakingNews = NewsService.fetchNews(x);

    console.log('Hello there');

}]);

mainApp.controller('InterestViewController', ['$scope', 'NewsService', function ($scope, NewsService) {
    console.log('interest');
}]);

mainApp.controller('SavedViewController', ['$scope', 'NewsService', function ($scope, NewsService) {
    console.log('saved');
}]);

mainApp.factory('NewsService', ['$http', function ($http) {
    let news = [];


    return{
        fetchNews: function(newsCall){
            $http({
                method: 'GET',
                url: 'http://chat.queencityiron.com/api/news/latest',
            }).then(function(response){
                console.log('response', response.data.stories);
                newsCall(response.data.stories);
            });
    },
    };

}]);
