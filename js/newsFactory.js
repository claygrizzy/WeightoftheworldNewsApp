/* jslint browser: true, esnext: true */

module.exports = (function (){
var service = angular.module('NewsService', []);

  service.factory('NewsService', ['$http', '$interval', function ($http, $interval) {
    let news = [];
    let save = [];
    let interests = [];

    return{
        fetchNews: function(/*newsCall*/){
          $http({
              method: 'GET',
              url: 'http://chat.queencityiron.com/api/news/latest',
          }).then(function(response){
              //console.log('response', response.data.stories);
              angular.copy(response.data.stories, news);
              console.log('this is the news array', news);
              //newsCall(response.data.stories);
          });
            $interval(function(){
                $http({
                    method: 'GET',
                    url: 'http://chat.queencityiron.com/api/news/latest',
                }).then(function(response){
                    console.log('response', response.data.stories);
                    angular.copy(response.data.stories, news);
                    console.log('this is the NEW news array', news);
//                    if (news.length !== response.data.stories.length){
//                        for (let i = 0; i < response.data.stories.length; i++) {
//                            if (response.data.stories[i] !== news[i]) {
//                                news.pop(response.data.stories[i]);
//                            }
//                            console.log(news);
//                        }
//                    }
                    //newsCall(response.data.stories);
                });
            },10000);
        },
        
        getNews: function () {
            return news;
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
        
        flagInterests: function () {
            console.log('flagged');
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
