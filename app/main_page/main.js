'use strict';

angular.module('feederApp')
  .controller('MainCtrl', function ($scope, $http, $q, pageSet) {
    //set the pages
    $scope.pageSet = pageSet.list;
    //get the page data
    var twitterList, youtubeList, instagramList = [];
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
      $scope.pageTurnRight = function() {
        for (var i in $scope.pageSet) {
          if ($scope.pageSet[i].position === 'first') {
            $scope.pageSet[i].position = 'fourth';
          } else if ($scope.pageSet[i].position === 'second') {
            $scope.pageSet[i].position = 'first';
          } else if ($scope.pageSet[i].position === 'third') {
            $scope.pageSet[i].position = 'second';
          } else {
            $scope.pageSet[i].position = 'third';
          }
        }
        $scope.$digest();
      }
      $scope.pageTurnLeft = function() {
        for (var i in $scope.pageSet) {
          if ($scope.pageSet[i].position === 'first') {
            $scope.pageSet[i].position = 'second';
          } else if ($scope.pageSet[i].position === 'second') {
            $scope.pageSet[i].position = 'third';
          } else if ($scope.pageSet[i].position === 'third') {
            $scope.pageSet[i].position = 'fourth';
          } else {
            $scope.pageSet[i].position = 'first';
          }
        }
        $scope.$digest();
      }
      //TODO: better sorting algorythm
      $scope.dataList = $scope.dataList.sort(function(a, b) {
        if(a.date > b.date)
          return -1;
        if(a.date < b.date)
          return 1;
        return 0
      });
    });
  });
