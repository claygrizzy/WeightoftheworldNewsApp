/* jslint browser: true, esnext: true */

require('./newsFactory');
// require('./filters');

let mainApp = angular.module('WorldNewsApp', ['ngRoute', 'NewsService', 'FilterService']);

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

    function artPop(callLink){
        $scope.breakingNews = callLink;
        // console.log('the Link call', callLink);
    }

    // $scope.breakingNews.published = $moment("20111031", "YYYYMMDD").fromNow();
    $scope.breakingNews = NewsService.fetchNews(artPop);

    $scope.clickSave = function(selectedArticle){
        // console.log('Article saved');
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
