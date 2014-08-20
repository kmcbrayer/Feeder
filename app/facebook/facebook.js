'use strict';

/**
 * @ngdoc function
 * @name feederApp.controller:TwitterCtrl
 * @description
 * # TwitterCtrl
 * Controller of the feederApp
 */
angular.module('feederApp')
  .controller('FacebookCtrl', function ($scope,$http) {
    $http.get('/api/facebook/currentUser').success(function(user) {
      $scope.user = {
        id : user.id,
        userName : user.username,
        displayName : user.displayName
      };
      $scope.hasUser = function() {
      if ($scope.user !== null)
        return true;
      return false;
    };
    });
    $http.get('/api/facebook/feed').success(function(data) {
      $scope.dataList = data;
    });
  });