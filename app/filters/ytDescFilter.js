'use strict';

angular.module('feederApp')
  .filter('youtubeDescription', function() {
    return function(text) {
      return text.substring(0,140)+"...";
    }
  })