'use strict';

angular.module('feederApp')
  .controller('MainCtrl', function ($scope, $http, $q, UserService) {
    //if the user is signed into twitter
    if (UserService.isLoggedIntoTwitter()){
      $scope.hasTwitterUser = true;
    }
    if (UserService.isLoggedIntoYoutube()){
      $scope.hasYoutubeUser = true;
    }
    if (UserService.isLoggedIntoInstagram()){
      $scope.hasInstagramUser = true;
    }
    var twitterList = [];
    var instagramList = [];
    var youtubeList = [];
    $scope.dataList = [];
    //if the user is logged in get feed
    $q.all([
      $http.get('/api/twitter/statuses').success(function(data) {
        twitterList = data;
      }),
      $http.get('/api/instagram/feed').success(function(feed) {
        instagramList = feed;
      }),
      $http.get('/api/youtube/subscriptions').success(function(subs) {
        youtubeList = subs;
      })
    ]).then(function() {
      if (twitterList !== []) {
        $scope.dataList = $scope.dataList.concat(twitterList);
      }
      if (instagramList !== []) {
        $scope.dataList = $scope.dataList.concat(instagramList);
      }
      if (youtubeList !== []) {
        $scope.dataList = $scope.dataList.concat(youtubeList);
      }
      $scope.dataList = $scope.dataList.sort(function(a, b) {
        if(a.date > b.date)
          return -1;
        if(a.date < b.date)
          return 1;
        return 0
      });
    });

  });
