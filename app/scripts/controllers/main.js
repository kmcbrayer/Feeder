'use strict';

angular.module('feederApp')
  .controller('MainCtrl', function ($scope, $http) {
    //leave in for now replace with dynamic page content later
    $http.get('/api/currentUser').success(function(user) {
      console.log('user : '+user);
      $scope.user = user;
    });

  });
