'use strict';

angular.module('feederApp')
  .controller('YoutubeCtrl', function($scope, $http) {
    $http.get('/api/youtube/currentUser').success(function(user) {
      $scope.user = {
        id : user.id,
        userName : user._json.screen_name,
        displayName : user._json.name,
        imageUrl : user._json.picture,
      };
      $scope.hasUser = function() {
      if ($scope.user !== null)
        return true;
      return false;
    };
    });
    $http.get('/api/youtube/subscriptions').success(function(subs) {
      $scope.dataList = subs;
    })
  });