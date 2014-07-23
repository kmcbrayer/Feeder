'use strict';

angular.module('feederApp')
  .controller('MainCtrl', function ($scope, $http) {
    //leave in for now replace with dynamic page content later
    $http.get('/api/currentUser').success(function(user) {
      $scope.user = {
      	id : user.id,
      	userName : user._json.screen_name,
      	displayName : user.displayName,
      	imageUrl : user.photos[0].value

      };
      $scope.raw = user;
    });

  });
