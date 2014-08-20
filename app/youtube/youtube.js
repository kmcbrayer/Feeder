'use strict';

angular.module('feederApp')
  .controller('YoutubeCtrl', function($scope, $http) {
    $http.get('/api/youtube/currentUser').success(function(user) {
      $scope.user = {
        id : user.id,
        userName : user._json.screen_name,
        displayName : user._json.name,
        imageUrl : user._json.picture,
      };
      $scope.hasUser = function() {
      if ($scope.user !== null)
        return true;
      return false;
    };
    });
    $http.get('/api/youtube/subscriptions').success(function(subs) {
      $scope.subs = subs;
      $scope.dataList = [];
      for (var i=0;i<subs.length;i++){
        var ytItem = {};
        ytItem.date = subs[i].publishedAt;
        ytItem.title = subs[i].title;
        ytItem.thumb = subs[i].thumbnails.default.url;
        ytItem.channelTitle = subs[i].channelTitle;
        // get link ytItem.link = subs[i].
        $scope.dataList.push(ytItem);
      }
    })
  });