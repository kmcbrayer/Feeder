'use strict';

/**
 * @ngdoc function
 * @name feederApp.controller:TwitterCtrl
 * @description
 * # TwitterCtrl
 * Controller of the feederApp
 */
angular.module('feederApp')
  .controller('TwitterCtrl', function ($scope,$http, UserService, localStorage) {
    $scope.$watch( UserService.isLoggedIntoTwitter(), function() {
      $scope.user = UserService.getTwitterInfo();
      $scope.hasUser = UserService.isLoggedIntoTwitter();
    });

    $http.get('/api/twitter/statuses').success(function(data) {
      if (data.status === 304){
        localStorage.setObject('twitUser', null);
        $scope.hasUser = UserService.isLoggedIntoTwitter();
      } else {
        $scope.dataList = data;
      }
    })
  });
