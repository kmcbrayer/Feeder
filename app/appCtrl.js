'use strict';

angular.module('feederApp')
  .controller('AppCtrl', function ($scope, $http, UserService) {
    $scope.user = UserService;
    $scope.clear = function() {
      window.localStorage.clear();
      UserService.userData = null;
    }
  });