'use strict';

angular.module('feederApp', [
  'ngCookies',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/#redditAww',{
        templateUrl: 'partials/redditAww',
        controller: 'RedditAwwCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });