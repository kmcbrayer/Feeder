'use strict';

angular.module('feederApp')
  .controller('MainCtrl', function ($scope, $http) {
    //leave in for now replace with dynamic page content later
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  });
