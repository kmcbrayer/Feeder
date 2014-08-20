'use strict';

/**
 * @ngdoc function
 * @name feederApp.controller:TwitterCtrl
 * @description
 * # TwitterCtrl
 * Controller of the feederApp
 */
angular.module('feederApp')
  .controller('TwitterCtrl', function ($scope,$http) {
    $http.get('/api/twitter/currentUser').success(function(user) {
      $scope.user = {
      	id : user.id,
      	userName : user._json.screen_name,
      	displayName : user.displayName,
      	imageUrl : user.photos[0].value
      };
      $scope.hasUser = function() {
        if ($scope.user !== null)
          return true;
        return false;
      };
    });
    $http.get('/api/twitter/statuses').success(function(data) {
    	$scope.dataList = data;
    });
  });
