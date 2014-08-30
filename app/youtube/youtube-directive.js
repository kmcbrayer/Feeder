'use strict';

angular.module('feederApp')
.directive('ytube', function() {
  return {
    restrict: 'E',
    templateUrl: 'youtube/youtube-directive.html',
    scope: {
      ytube: "="
    }
  }
})