'use strict';

angular.module('feederApp')
  .controller('InstagramCtrl', function($scope, $http) {
    $http.get('/api/instagram/feed').success(function(data) {
        $scope.dataList = data;
        $scope.hasUser = UserService.isLoggedIntoInstagram();
    });
  });