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
        UserService.info.twitter.userName = user._json.screen_name;
        UserService.info.twitter.displayName = user.displayName;
        UserService.info.twitter.photoUrl = user.photos[0].value,

        $scope.user = UserService.info.twitter;
        // set logged in to true
        UserService.isLoggedIntoTwitter = true;
        $scope.hasUser = true;
      });
    } else {
      $scope.user = UserService.info.twitter;
      $scope.hasUser = UserService.isLoggedIntoTwitter;
    }
    $http.get('/api/twitter/statuses').success(function(data) {
    	$scope.dataList = data;
    });
  });
