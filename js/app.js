/* jslint browser: true, esnext: true */

require('./filters');
require('./newsFactory');

var mainApp = angular.module('WorldNewsApp', ['ngRoute', 'FilterService', 'NewsService']);

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
        })
        .otherwise({
            redirectTo: '/main',
        });
}]);

mainApp.controller('MainViewController', ['$scope', 'NewsService', function ($scope, NewsService) {

    NewsService.fetchNews();
//    NewsService.getNewsIDs();
//    NewsService.refetchNews();
//    NewsService.getNews();
    $scope.breakingNews = NewsService.getNews();
    $scope.interesting = function (title) {
        title = title.toLowerCase();
        for (var i = 0; i < NewsService.getInterests().length; i++) {
                    if (title.indexOf(NewsService.getInterests()[i], 0) >= 0) {
                        console.log(title);
                        console.log(NewsService.getInterests()[i]);
                        console.log(true);
                        return true;
                    } else {
                        console.log('no', title);
                        console.log(NewsService.getInterests()[i]);
                        console.log(false);
                        return false;
                    }
                }
    };
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
    //NewsService.flagInterest();
}]);

mainApp.controller('SavedViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {

    $scope.savedCollection = NewsService.fetchSaved();

}]);
