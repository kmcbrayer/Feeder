'use strict';

angular.module('feederApp')
  .controller('YoutubeCtrl', function($scope, $http, UserService) {
     $scope.user = null;
    if (UserService.userData){
      $http.get('/api/youtube/currentUser').success(function(user) {
        var userData = {
          userName : user._json.screen_name,
          displayName : user._json.name,
          photoUrl : user._json.picture
        }
        UserService.setUserData('youtube',userData);
        $scope.user = userData;
        // set logged in to true
      });
    } else {
      $scope.user = UserService.userData.info.youtube;
    }
    $scope.hasUser = function() {
      if ($scope.user === null) {
        UserService.setLoggedIn('youtube', false);
        return false;
      } else {
        UserService.setLoggedIn('youtube', true);
        return true;
      }
    }
    $http.get('/api/youtube/subscriptions').success(function(subs) {
      $scope.dataList = subs;
    })
  });