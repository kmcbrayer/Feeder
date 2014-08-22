'use strict';

angular.module('feederApp')
  .controller('AppCtrl', function ($scope, $http, UserService) {
    $scope.user = UserService;
  });