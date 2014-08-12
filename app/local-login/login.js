'use strict';

angular.module('feederApp')
  .controller('LoginCtrl', function ($scope, $rootScope) {
    $scope.credentials = {
    	username: '',
    	password: ''
  	};
    $scope.login = function (credentials) {
      //what ever
    };
  });