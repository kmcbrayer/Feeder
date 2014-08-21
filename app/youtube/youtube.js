'use strict';

angular.module('feederApp')
  .controller('YoutubeCtrl', function($scope, $http, UserService) {
    if (UserService.isLoggedIntoYoutube === false){
      $http.get('/api/youtube/currentUser').success(function(user) {
        UserService.info.youtube.userName = user._json.screen_name;
        UserService.info.youtube.displayName = user._json.name;
        UserService.info.youtube.photoUrl = user._json.picture,

        $scope.user = UserService.info.youtube;
        // set logged in to true
        UserService.isLoggedIntoYoutube = true;
        $scope.hasUser = true;
      });
    } else {
      $scope.user = UserService.info.youtube;
      $scope.hasUser = UserService.isLoggedIntoYoutube;
    }
    $http.get('/api/youtube/subscriptions').success(function(subs) {
      $scope.dataList = subs;
    })
  });