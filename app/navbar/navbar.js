'use strict';

angular.module('feederApp')
  .controller('NavbarCtrl', function($scope,$location, pageSet, UserService) {
    $scope.pageSet = pageSet;
    $scope.user = UserService.userData;

    //set the page links if logged in
    //twitter
    if($scope.user.twitData.isLoggedIn) {
      //angular ng-repeat auto sorts so I have to use an array
      for (var i in pageSet) {
        if (pageSet[i].name === 'Twitter') {
          $scope.pageSet[i].href = '/twitter';
        }
      }
    }
    //youtube
    if($scope.user.ytData.isLoggedIn) {
      for (var i in pageSet) {
        if (pageSet[i].name === 'Youtube') {
          $scope.pageSet[i].href = '/youtube';
        }
      }
    }
    //instagram
    if($scope.user.igData.isLoggedIn) {
      for (var i in pageSet) {
        if (pageSet[i].name === 'Instagram') {
          $scope.pageSet[i].href = '/instagram';
        }
      }
    }

    //set active based on location
    var path = $location.path();
    if(path === "/") {
      setActive('Main', $scope.pageSet);
    } else if(path === "/twitter") {
      setActive('Twitter', $scope.pageSet);
    } else if(path === "/instagram") {
      setActive('Instagram', $scope.pageSet);
    } else if(path === "/youtube") {
      setActive('Youtube', $scope.pageSet);
    }

    function setActive(pageName, pageSet) {
      for (var i in pageSet) {
        if (pageSet[i].name === pageName) {
          pageSet[i].isActive = true;
        } else {
          pageSet[i].isActive = false;
        }
      }
    }


  });