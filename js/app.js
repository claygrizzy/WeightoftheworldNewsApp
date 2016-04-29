/* jslint browser: true, esnext: true */

require('./filters');
require('./newsFactory');

let mainApp = angular.module('WorldNewsApp', ['ngRoute', 'FilterService', 'NewsService']);

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

    NewsService.fetchNews();
    NewsService.getNewsIDs();
//    NewsService.refetchNews();
//    NewsService.getNews();
    $scope.breakingNews = NewsService.getNews();

    $scope.clickSave = function(selectedArticle){
        NewsService.clickSave(selectedArticle);
    };
}]);

mainApp.controller('InterestViewController', ['$scope', 'NewsService', function ($scope, NewsService) {

    $scope.addNewInterest = function() {
        NewsService.addInterest(document.getElementById('input').value);
    };

    $scope.myInterests = NewsService.myInterests();



    $scope.removeThisInterest = function (interest) {
        NewsService.removeInterest(interest);
    };

}]);

mainApp.controller('SavedViewController', ['$scope', 'NewsService', function ($scope, NewsService) {

    $scope.savedCollection = NewsService.fetchSaved();

}]);
