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
    function artPop(callLink){
        $scope.breakingNews = callLink;
        // console.log('the Link call', callLink);
    }
    $scope.breakingNews = NewsService.fetchNews(artPop);

    $scope.clickSave = function(selectedArticle){
        // console.log('Article saved');
        NewsService.clickSave(selectedArticle);
    };
}]);

mainApp.controller('InterestViewController', ['$scope', 'NewsService', function ($scope, NewsService) {
    console.log('interest');
}]);

mainApp.controller('SavedViewController', ['$scope', 'NewsService', function ($scope, NewsService) {
    // function savedArt(y){
    //     $scope.savedCollection = y;
    //     console.log('the saved call', y);
    // }
    // $scope.savedCollection = NewsService.clickSave(savedArt);
    $scope.savedCollection = NewsService.fetchSaved();

    // console.log('saved');
}]);

mainApp.factory('NewsService', ['$http', function ($http) {
    let news = [];
    let save = [];


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
        clickSave: function(article){
            save.push(article);
            console.log('these saved', save);
            // angular.copy(article, save);
        },
        fetchSaved: function() {
            return save;
        }
    };

}]);
