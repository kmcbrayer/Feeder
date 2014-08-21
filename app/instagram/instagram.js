'use strict';

angular.module('feederApp')
  .controller('InstagramCtrl', function($scope, $http) {
    $http.get('/api/instagram/currentUser').success(function(user) {
      $scope.user = {
        id : user.id,
        userName : user.username,
        displayName : user.displayName,
        imageUrl : user._json.data.profile_picture,
      };
      $scope.hasUser = function() {
        if ($scope.user !== null)
          return true;
        return false;
      };
    });
    $http.get('/api/instagram/feed').success(function(feed) {
      $scope.dataList = feed;
    });
  });