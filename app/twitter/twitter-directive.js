'use strict';

angular.module('feederApp')
.directive('tweet', function() {
  return {
    restrict: 'E',
    templateUrl: 'twitter/twitter-directive.html',
    scope: {
      tweet: "="
    }
  }
})