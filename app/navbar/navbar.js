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
    },
    {
      'title': 'youtube',
      'link': '/youtube'
    },
    {
      'title': 'instagram',
      'link': '/instagram'
    }];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
