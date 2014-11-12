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
    $http.get('/api/twitter/statuses').success(function(data) {
      $scope.dataList = data;
    })
  });
