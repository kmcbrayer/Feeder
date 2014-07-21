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
      .when('/redditAww',{
        templateUrl: 'partials/redditAww',
        controller: 'RedditAwwCtrl'
      })
      .when('/login',{
        templateUrl: 'partials/login_local',
        controller: 'LoginCtrl'
      })
      .when('/twitter', {
        templateUrl: 'views/twitter.html',
        controller: 'TwitterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });