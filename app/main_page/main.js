'use strict';

angular.module('feederApp')
  .controller('MainCtrl', function ($scope, $http) {
    //leave in for now replace with dynamic page content later
    $http.get('/api/twitter/currentUser').success(function(user) {
      $scope.user = {
      	id : user.id,
      	userName : user._json.screen_name,
      	displayName : user._json.name,
        imageUrl : user.photos[0].value
      };
    })
    .error(function() {
      //eat this error
    });

  });
