'use strict';

angular.module('feederApp')
  .controller('InstagramCtrl', function($scope, $http, UserService, localStorage) {
    $scope.$watch( UserService.isLoggedIntoInstagram(), function() {
      $scope.user = UserService.getInstagramInfo();
      $scope.hasUser = UserService.isLoggedIntoInstagram();
    });
    
    $http.get('/api/instagram/feed').success(function(data) {
      if (data.status === 304){
        localStorage.setObject('igUser', null);
        $scope.hasUser = UserService.isLoggedIntoInstagram();
      } else {
        $scope.dataList = data;
        $scope.hasUser = UserService.isLoggedIntoInstagram();
      }
    });
  });