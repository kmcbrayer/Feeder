'use strict';

angular.module('feederApp')
  .controller('YoutubeCtrl', function($scope, $http) {
    
    $http.get('/api/youtube/subscriptions').success(function(data) {
      $scope.dataList = data;
    })
  });