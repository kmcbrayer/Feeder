'use strict';

angular.module('feederApp', [
  'ngCookies',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main_page/main.html',
        controller: 'MainCtrl'
      })
      .when('/redditAww',{
        templateUrl: 'reddit/redditAww.html',
        controller: 'RedditAwwCtrl'
      })
      .when('/login',{
        templateUrl: 'local-login/login',
        controller: 'LoginCtrl'
      })
      .when('/twitter', {
        templateUrl: 'twitter/twitter.html',
        controller: 'TwitterCtrl'
      })
      .when('/facebook', {
        templateUrl: 'facebook/facebook.html',
        controller: 'FacebookCtrl'
      })
      .when('/youtube', {
        templateUrl: 'youtube/youtube.html',
        controller: 'YoutubeCtrl'
      });
    $locationProvider.html5Mode(true);
  });