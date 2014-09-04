'use strict';

angular.module('feederApp')
  .controller('YoutubeCtrl', function($scope, $http, UserService, localStorage) {
    $scope.$watch( UserService.isLoggedIntoYoutube(), function() {
      $scope.user = UserService.getYoutubeInfo();
      $scope.hasUser = UserService.isLoggedIntoYoutube();
    });
    $http.get('/api/youtube/subscriptions').success(function(data) {
      if (data.status === 304){
        localStorage.setObject('ytUser', null);
        $scope.hasUser = UserService.isLoggedIntoYoutube();
      } else {
        $scope.dataList = data;
      }
    })
  });