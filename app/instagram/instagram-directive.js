'use strict';

angular.module('feederApp')
.directive('igram', function() {
  return {
    restrict: 'E',
    templateUrl: 'instagram/instagram-directive.html',
    scope: {
      igram: "="
    }
  }
})