'use strict';

angular.module('feederApp')
  .controller('MainCtrl', function ($scope, $http, $q, pageSet, UserService) {
    //update user service first thing:
    UserService.updateTwitterInfo();
    UserService.updateInstagramInfo();
    UserService.updateYoutubeInfo();
    var twitterList, youtubeList, instagramList = [];
    $scope.user = UserService;
    $scope.dataList = [];
    $q.all([
      $http.get('/api/twitter/statuses').success(function(data) {
        twitterList = data;
        $scope.twitterList = twitterList;
      }),
      $http.get('/api/instagram/feed').success(function(feed) {
        instagramList = feed;
        $scope.instagramList = instagramList;
      }),
      $http.get('/api/youtube/subscriptions').success(function(subs) {
        youtubeList = subs;
        $scope.youtubeList = youtubeList;
      })
    ]).then(function() {
      if (twitterList !== []) {
        $scope.dataList = $scope.dataList.concat($scope.twitterList);
      }
      if (instagramList !== []) {
        $scope.dataList = $scope.dataList.concat($scope.instagramList);
      }
      if (youtubeList !== []) {
        $scope.dataList = $scope.dataList.concat($scope.youtubeList);
      }
      $scope.dataList = $scope.dataList.sort(function(a, b) {
        if(a.date > b.date)
          return -1;
        if(a.date < b.date)
          return 1;
        return 0
      });
    });
    console.log($scope.user)

    //page locations and init
    $scope.pageSet = pageSet;
    $scope.active=0;
  });
