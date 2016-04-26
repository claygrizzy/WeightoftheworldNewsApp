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

    $scope.addNewInterest = function() {
        NewsService.addInterest(document.getElementById('input').value);
    };
    
}]);

mainApp.controller('SavedViewController', ['$scope', 'NewsService', function ($scope, NewsService) {
    
    $scope.savedCollection = NewsService.fetchSaved();

}]);

mainApp.factory('NewsService', ['$http', '$interval', function ($http, $interval) {
    let news = [];
    let save = [];
    let interests = [];

    return{
        fetchNews: function(newsCall){
            //$interval(function(){
                $http({
                    method: 'GET',
                    url: 'http://chat.queencityiron.com/api/news/latest',
                }).then(function(response){
                    console.log('response', response.data.stories);
                    newsCall(response.data.stories);
                });
            //},100000);
        },

        clickSave: function(article){
            save.push(article);
            console.log('these saved', save);
            // angular.copy(article, save);
        },
        
        fetchSaved: function() {
            return save;
        },
        addInterest: function (interest) {
            interests.push(interest);
            //console.log(interest + ' was added to your interests array');
            console.log(interests);   
        },
        
        myInterests: function () {
            console.log(interests);
            return interests;
        }
        
    };

}]);
