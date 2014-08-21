'use strict';

angular.module('feederApp')
  .controller('AppCtrl', function ($scope, $http, UserService, localStorageService) {
    if (localStorageService.get('userData')){
      UserService = localStorageService.get('userData');
    } else {
      $scope.user = UserService;
      localStorageService.bind($scope, 'userData', $scope.user);
    }
  });