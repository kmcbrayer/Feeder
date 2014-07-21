'use strict';

angular.module('feederApp')
  .controller('LoginCtrl', function ($scope, $rootScope) {
    $scope.credentials = {
    	username: '',
    	password: ''
  	};
    $scope.login = function (credentials) {
      AuthService.login(credentials).then(function (user) {
        //$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        //$scope.setCurrentUser(user);
      }, function () {
        //login failed
      });
    };
  });