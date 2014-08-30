'use strict';

angular.module('feederApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'twitter',
      'link': '/twitter'
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
