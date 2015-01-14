'use strict';

angular.module('feederApp')
  .controller('MainCtrl', function ($scope, $http, $q, pageSet, UserService) {
    //update user service first thing:
    UserService.updateTwitterInfo();
    UserService.updateInstagramInfo();
    UserService.updateYoutubeInfo();

    $scope.dataList = [];
    $q.all([
      $http.get('/api/twitter/statuses').success(function(data) {
        $scope.twitterList = data;
      }),
      $http.get('/api/instagram/feed').success(function(feed) {
        $scope.instagramList = feed;
      }),
      $http.get('/api/youtube/subscriptions').success(function(subs) {
        $scope.youtubeList = subs;
      })
    ]).then(function() {
      if ($scope.twitterList !== null) {
        $scope.dataList = $scope.dataList.concat($scope.twitterList);
      }
      if ($scope.instagramList !== null) {
        $scope.dataList = $scope.dataList.concat($scope.instagramList);
      }
      if ($scope.youtubeList !== null) {
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
    //page locations and init
    $scope.pageSet = pageSet;
    $scope.active=0;

    $scope.swipeLeft = function() {
      //active tab controls
      $scope.pageSet[$scope.active].isActive = false;
      
      $scope.pageSet.forEach(function(page) {
        var pos = page.position;
        if (pos == "first") 
          page.position = "fourth"
        if (pos == "second") 
          page.position = "first"
        if (pos == "third") 
          page.position = "second"
        if (pos == "fourth") 
          page.position = "third"
      });
      $scope.active++;

      if ($scope.active > 3) {
        $scope.active=0;
      }
      $scope.pageSet[$scope.active].isActive = true;
      // insert cool transitions? 

    };

    $scope.swipeRight = function() {
      $scope.pageSet[$scope.active].isActive = false;
      $scope.pageSet.forEach(function(page) {
        var pos = page.position;
        if (pos == "first") 
          page.position = "second"
        if (pos == "second") 
          page.position = "third"
        if (pos == "third") 
          page.position = "fourth"
        if (pos == "fourth") 
          page.position = "first"
      });

      $scope.active--;

      if ($scope.active <0) {
        $scope.active = 3;
      }
      $scope.pageSet[$scope.active].isActive = true;
      // insert cool transitions?
    }

  });
