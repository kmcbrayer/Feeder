'use strict';

angular.module('feederApp')
  .controller('MainCtrl', function ($scope, $http, UserService) {
    //if the user is signed into twitter
    var twitterList = [];
    var instagramList = [];
    var youtubeList = [];
    $scope.dataList = [];
    //if the user is logged in get feed
    if (UserService.isLoggedIntoTwitter) {
      $http.get('/api/twitter/statuses').success(function(data) {
        $scope.twitterList = data;
      });
    }
    if (UserService.isLoggedIntoInstagram) {
      $http.get('/api/instagram/feed').success(function(feed) {
        $scope.instagramList = feed;
      });
    }
    if (UserService.isLoggedIntoYoutube) {
      $http.get('/api/youtube/subscriptions').success(function(subs) {
        $scope.youtubeList = subs;
      });
    }
    //compile list into dataList

  });
