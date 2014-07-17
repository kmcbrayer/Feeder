'use strict';

angular.module('feederApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'About',
      'link': '#'
    },
    {
      'title': 'Contact',
      'link': '#'
    },
    {
      'title': 'Reddit',
      'link': '/#redditAww'
    }];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
