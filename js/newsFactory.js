/* jslint browser: true, esnext: true */

module.exports = (function () {
    var service = angular.module('NewsService', []);

    service.factory('NewsService', ['$http', '$interval', function ($http, $interval) {
        let news = [];
        let newsIDs = [];
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
                    angular.copy(response.data.stories, news);
                    console.log(news);
                    console.log(newsIDs);
                });
                $interval(function () {
                    $http({
                        method: 'GET',
                        url: 'http://chat.queencityiron.com/api/news/latest',
                    }).then(function (response) {
                        for (let i = 0; i < response.data.stories.length; i++) {
                            if (newsIDs.includes(response.data.stories[i].id) === false) {
                                newsIDs.push(response.data.stories[i].id);
                                news.push(response.data.stories[i]);
                            }
                        }
                        console.log(news);
                        console.log(newsIDs);
                    });
                }, 100000);
            },

            getNewsIDs: function () {
                for (let i = 0; i < news.length; i++) {
                    newsIDs.push(news.id[i]);
                }
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
