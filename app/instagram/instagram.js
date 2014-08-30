'use strict';

angular.module('feederApp')
  .controller('InstagramCtrl', function($scope, $http, UserService) {
    $scope.user = null;
    if (UserService.userData){
      $http.get('/api/instagram/currentUser').success(function(user) {
        var userData = {
          userName : user.username,
          displayName : user.displayName,
          photoUrl : user._json.data.profile_picture
        }
        UserService.setUserData('instagram', userData);

        $scope.user = UserService.userData.info.instagram;
      });
    } else {
      $scope.user = UserService.userData.info.instagram;
    }
    $scope.hasUser = function() {
      if ($scope.user === null) {
        UserService.setLoggedIn('instagram', false);
        return false;
      } else {
        UserService.setLoggedIn('instagram', true);
        return true;
      }
    }
    
    $http.get('/api/instagram/feed').success(function(feed) {
      $scope.dataList = feed;
    });
  });