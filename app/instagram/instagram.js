'use strict';

angular.module('feederApp')
  .controller('InstagramCtrl', function($scope, $http, UserService) {
    if (UserService.isLoggedIntoInstagram === false){
      $http.get('/api/instagram/currentUser').success(function(user) {
        UserService.info.instagram.userName = user.username;
        UserService.info.instagram.displayName = user.displayName;
        UserService.info.instagram.photoUrl = user._json.data.profile_picture,

        $scope.user = UserService.info.instagram;
        // set logged in to true
        UserService.isLoggedIntoInstagram = true;
        $scope.hasUser = true;
      });
    } else {
      $scope.user = UserService.info.instagram;
      $scope.hasUser = UserService.isLoggedIntoInstagram;
    }
    
    $http.get('/api/instagram/feed').success(function(feed) {
      $scope.dataList = feed;
    });
  });