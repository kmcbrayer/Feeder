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
    $scope.user = null;
    if (UserService.userData !==null){
      $http.get('/api/twitter/currentUser').success(function(user) {
        var userData = {
          userName :    user._json.screen_name,
          displayName : user.displayName,
          photoUrl :    user.photos[0].value
        }
        UserService.setUserData('twitter', userData);

        $scope.user = UserService.userData.info.twitter;
      });
    } else {
      //will need to get new token I think.
      $scope.user = UserService.userData.info.twitter;
    }
    $scope.hasUser = function() {
      if ($scope.user === null) {
        UserService.setLoggedIn('twitter', false);
        return false;
      } else {
        UserService.setLoggedIn('twitter', true);
        return true;
      }
    }
    $http.get('/api/twitter/statuses').success(function(data) {
    	$scope.dataList = data;
    });
  });
