/* jslint browser: true, esnext: true */

module.exports = (function () {
    var service = angular.module('NewsService', []);

    let Firebase = require('firebase');
    let fireRequest = new Firebase('https://weightoftheworldnews.firebaseio.com/');

    function Article(title, id, published){
        this.title = title;
        this.id = id;
        this.published = published;

        return this;
    }

    service.factory('NewsService', ['$http', '$interval', function ($http, $interval) {
        let news = [];
        let newsIDs = [];
        let newsTitles = [];
        let save = [];
        let interests = [];


        return {
            fetchNews: function () {
                $http({
                    method: 'GET',
                    url: 'http://chat.queencityiron.com/api/news/latest',
                }).then(function (response) {
                    for (let i = 0; i < response.data.stories.length; i++) {
                        newsIDs.push(response.data.stories[i].id);
                    }
                    for (let i = 0; i < response.data.stories.length; i++) {
                        response.data.stories[i].title = response.data.stories[i].title.toLowerCase();
                        // console.log(response.data.stories[i].title);
                        newsTitles.push(response.data.stories[i].title);
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
                        for (let i = 0; i < response.data.stories.length; i++) {
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

            getNewsIDs: function () {
                for (let i = 0; i < news.length; i++) {
                    newsIDs.push(news[i].id);
                }
                console.log(newsIDs);

                return newsIDs;
            },
            getNews: function () {
                return news;
            },

            clickSave: function (article) {
                // save.push(article);
                // console.log('these saved', save);
                let title = article.title;
                let id = article.id;
                let published = article.published;

                var savedArticle = new Article(title, id, published);
                console.log(savedArticle);
                var articleToSave = new Firebase('https://weightoftheworldnews.firebaseio.com/saved/' + savedArticle.id);
                articleToSave.set(savedArticle, function(){
                    console.log('New article saved');
                });
                },

            fetchSaved: function () {
                let firePull = new Firebase('https://weightoftheworldnews.firebaseio.com/saved/');
                firePull.once('value', function(bringThemIn){
                    console.log(bringThemIn.val());
                    return(bringThemIn.val());
                });

            },

            addInterest: function (interest) {
                interest = interest.toLowerCase();
                interests.push(interest);
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
