/* jslint browser: true, esnext: true */

module.exports = (function () {
    var service = angular.module('NewsService', []);

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
                save.push(article);
                console.log('these saved', save);
                },

            fetchSaved: function () {
                return save;
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
