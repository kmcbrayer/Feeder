'use strict';

angular.module('feederApp')
  .controller('RedditAwwCtrl', function ($scope, $http) {
    $http.get('/api/redditAww').success(function(awwData) {
      $scope.awwData = awwData;
    });
    console.log($scope.awwData);
  });