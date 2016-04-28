/* jslint browser: true, esnext: true */

var moment = require('moment');
module.exports = (function (){
var service = angular.module('NewsService', []);

  service.factory('NewsService', ['$http', '$interval', function ($http, $interval) {
    let news = [];
    let save = [];
    let interests = [];

    return{
        fetchNews: function(newsCall){
          $http({
              method: 'GET',
              url: 'http://chat.queencityiron.com/api/news/latest',
          }).then(function(response){
              console.log('response', response.data.stories);
              newsCall(response.data.stories);
          });
            $interval(function(){
                $http({
                    method: 'GET',
                    url: 'http://chat.queencityiron.com/api/news/latest',
                }).then(function(response){
                    console.log('response', response.data.stories);
                    newsCall(response.data.stories);
                });
            },100000);
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
        },

        removeInterest: function (interest) {
            console.log(interest);
            function clear(value) {
                return value !== interest;
            }
            angular.copy(interests.filter(clear), interests);
            console.log(interests);
        }

    };

}]);
}());
