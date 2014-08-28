'use strict';

angular.module('feederApp')
.directive('tweetList', function() {
  console.log('tweetList')
  return {
    restrict: 'E',
    templateUrl: 'twitter/twitter-directive.html',
    scope: {
      dataList: "="
    }
  }
})