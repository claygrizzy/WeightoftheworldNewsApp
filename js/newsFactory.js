/* jslint browser: true, esnext: true */

module.exports = (function () {
    var service = angular.module('NewsService', []);

    var Firebase = require('firebase');
    var fireRequest = new Firebase('https://weightoftheworldnews.firebaseio.com/');

    function Article(title, id, published){
        this.title = title;
        this.id = id;
        this.published = published;

        return this;
    }

    service.factory('NewsService', ['$http', '$interval', function ($http, $interval) {
        var news = [];
        var newsIDs = [];
        var newsTitles = [];
        var save = [];
        var interests = [];
//        var common = [];
//        var notCommon = [];


        return {
            fetchNews: function () {
                $http({
                    method: 'GET',
                    url: 'http://chat.queencityiron.com/api/news/latest',
                }).then(function (response) {
                    for (var i = 0; i < response.data.stories.length; i++) {
                        newsIDs.push(response.data.stories[i].id);
                    }
                    for (var j = 0; j < response.data.stories.length; j++) {
                        response.data.stories[j].title = response.data.stories[j].title.toLowerCase();

                        // console.log(response.data.stories[i].title);
                        newsTitles.push(response.data.stories[j].title);
                    }
                    angular.copy(response.data.stories, news);
                    //console.log(news);
                    //console.log(newsIDs);
                    //console.log(newsTitles);
                });
                $interval(function () {
                    $http({
                        method: 'GET',
                        url: 'http://chat.queencityiron.com/api/news/latest',
                    }).then(function (response) {
                        for (var i = 0; i < response.data.stories.length; i++) {
                            if (newsIDs.includes(response.data.stories[i].id) === false) {
                                news.push(response.data.stories[i]);
                                newsIDs.push(response.data.stories[i].id);
                                newsTitles.push(response.data.stories[i].title);
                            }
                        }
                        //console.log(news);
                        //console.log(newsIDs);
                    });
                }, 100000);
            },

            getNews: function () {
                return news;
            },

            getTitles: function () {
                return newsTitles;
            },

            getInterests: function () {
                return interests;
            },

            clickSave: function (article) {

                var title = article.title;
                var id = article.id;
                var published = article.published;

                var savedArticle = new Article(title, id, published);
                console.log(savedArticle);
                var articleToSave = new Firebase('https://weightoftheworldnews.firebaseio.com/saved/' + savedArticle.id);
                articleToSave.set(savedArticle, function(){
                    console.log('New article saved');
                });
                // save.push(article);
                // console.log('these saved', save);
                },

            fetchSaved: function () {
                var firePull = new Firebase('https://weightoftheworldnews.firebaseio.com/saved/');
                firePull.once('value', function(article){
                    console.log(article.val());
                    var data = article.val();
                    // for( var i = 0; i< data.length; i++){
                    save.push(data);
                    console.log('saved?', save);
                    //}
                });
            },

            addInterest: function (interest) {
                interest = interest.toLowerCase();
                interests.push(interest);
                console.log(interests);
                console.log(interest);

                //return interest;
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


//for (var i = 0; i < newsTitles.length; i++) {
//    for (var j = 0; j < interests.length; j++) {
//        if (newsTitles[i].indexOf(interests[j], 0) >= 0) {
//            var index = newsIDs[i];
//            console.log(index);
//            var id = index.toString();
//            console.log(id);
//            document.getElementById(id).removeAttribute('hidden');
////            console.log(index);
////            console.log(newsTitles[index]);
////            console.log(newsIDs[index]);
////            common.push(newsTitles[i]);
//         } else {
//             console.log('this article doesn\'t mention any of your interests');
//             /*
//             var index = newsIDs[i];
//             console.log(index);
//             var id = index.toString();
//             console.log(id);
//             document.getElementById(id).setAttribute('hidden');
//             */
////             notCommon.push(newsTitles[i]);
//
//         }
////         console.log(common);
////         console.log(notCommon);
//    }
//}
//
//            flagInterest: function (interest) {
//                console.log(interest);
//                for (var i = 0; i < newsTitles.length; i++) {
//                    if (newsTitles[i].indexOf(interest, 0) >= 0) {
//                        console.log(interest);
//                        console.log(true);
//                        return true;
//                    } else {
//                        console.log('no', interest);
//                        console.log(false);
//                        return false;
//                    }
//                }
//            },
