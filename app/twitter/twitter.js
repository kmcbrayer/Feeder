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
    $scope.$watch( UserService.isLoggedIntoTwitter(), function() {
      $scope.user = UserService.getTwitterInfo();
      $scope.hasUser = UserService.isLoggedIntoTwitter();
    });

    $http.get('/api/twitter/statuses').success(function(data) {
    	$scope.dataList = data;
    });
  });
