'use strict';

/**
 * @ngdoc function
 * @name feederApp.controller:TwitterCtrl
 * @description
 * # TwitterCtrl
 * Controller of the feederApp
 */
angular.module('feederApp')
  .controller('TwitterCtrl', function ($scope) {
    $http.get('/api/currentUser').success(function(user) {
      $scope.user = {
      	id : user.id,
      	userName : user._json.screen_name,
      	displayName : user.displayName,
      	imageUrl : user.photos[0].value,

      }
     
    });
  });
