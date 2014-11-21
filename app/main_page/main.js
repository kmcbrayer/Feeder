'use strict';

angular.module('feederApp')
  .controller('MainCtrl', function ($scope, $http, $q) {
    var twitterList = [];
    var instagramList = [];
    var youtubeList = [];
    $scope.dataList = [];
    //if the user is logged in get feed
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
    $scope.pageSet = [
      {
        name: "Main",
        isActive: true,
        position: "first"
      },
      {
        name: "Twitter",
        isActive: false,
        position: "second"
      },
      {
        name: "Youtube",
        isActive: false,
        position: "third"
      },
      {
        name: "Instagram",
        isActive: false,
        position: "fourth"
      }
    ];
    $scope.active=0;

    $scope.swipeLeft = function() {
      //active tab controls
      $scope.pageSet[$scope.active].isActive = false;
      
      $scope.pageSet.forEach(function(page) {
        console.log(page)
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
        console.log(page)
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
    }

  });
