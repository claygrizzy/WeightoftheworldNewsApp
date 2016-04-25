/* jslint browser: true, esnext: true */

let app = angular.module('WorldNewsApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
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
    
}]);

mainApp.controller('InterestViewController', ['$scope', 'NewsService', function ($scope, NewsService) {
    
}]);

mainApp.controller('SavedViewController', ['$scope', 'NewsService', function ($scope, NewsService) {
    
}]);

main.factory('NewsService', ['$http', function ($http) {
    
}]);
