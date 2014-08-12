'use strict';

angular.module('feederApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Login',
      'link': '/login'
    },
    {
      'title': 'Reddit',
      'link': '/redditAww'
    },
    {
      'title': 'Twitter',
      'link': '/twitter'
    },
    {
      'title': 'facebook',
      'link': '/facebook'
    }];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
