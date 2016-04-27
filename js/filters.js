/* jslint browser: true, esnext: true */

module.exports = (function (){
  var filters = angular.module('FilterService', []);

  filters.filter('reverse', ['$scope', function($scope, reverse){
    return function(newsItems){
      return newsItems.slice().reverse();
    };

  }]);
});
