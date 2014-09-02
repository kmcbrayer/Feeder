'use strict';

angular.module('feederApp')
  .controller('InstagramCtrl', function($scope, $http, UserService) {
    $scope.user = UserService.getInstagramInfo();

    $scope.hasUser = function() {
      if ($scope.user.userName === null) {
        return false;
      } else {
        return true;
      }
    };
    
    $http.get('/api/instagram/feed').success(function(feed) {
      $scope.dataList = feed;
    });
  });