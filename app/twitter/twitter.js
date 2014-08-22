'use strict';

/**
 * @ngdoc function
 * @name feederApp.controller:TwitterCtrl
 * @description
 * # TwitterCtrl
 * Controller of the feederApp
 */
angular.module('feederApp')
  .controller('TwitterCtrl', function ($scope,$http, UserService) {
    if (UserService.isLoggedIntoTwitter === false){
      $http.get('/api/twitter/currentUser').success(function(user) {
        var userData = {
          userName :    user._json.screen_name,
          displayName : user.displayName,
          photoUrl :    user.photos[0].value
        }
        UserService.setUserData('twitter', userData);

        $scope.user = UserService.info.twitter;
        // set logged in to true
        UserService.userData.isLoggedIntoTwitter = true;
        $scope.hasUser = true;
      });
    } else {
      $scope.user = UserService.userData.info.twitter;
      $scope.hasUser = UserService.userData.isLoggedIntoTwitter;
    }
    $http.get('/api/twitter/statuses').success(function(data) {
    	$scope.dataList = data;
    });
  });
