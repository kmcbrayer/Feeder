'use strict';

angular.module('feederApp')
  .controller('AppCtrl', function ($scope, $http, UserService) {
    //user updates on pageload. 
    //should store to prevent less calls
    $scope.user = UserService.userData;
    UserService.updateTwitterInfo();
    UserService.updateInstagramInfo();
    UserService.updateYoutubeInfo();
  });