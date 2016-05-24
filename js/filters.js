/* jslint browser: true, esnext: true */

module.exports = (function (){
  var moment = require('moment');
  var filters = angular.module('FilterService', []);

  filters.filter('fromNow', function(){
    return function(date){
      return moment(date).fromNow();
    };
  });

})();
