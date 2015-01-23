'use strict';

angular.module('feederApp')
  .service('UserService', function($rootScope, $http) {
    var userData = {
      twitData: {isLoggedIn :  false},
      igData: {isLoggedIn :  false},
      ytData: {isLoggedIn :  false},
    };

    this.updateTwitterInfo = function() {
      $http.get('/api/twitter/currentUser').success(function(user) {
        var twitData = {
          isLoggedIn :  true,
          userName :    user._json.screen_name,
          displayName : user.displayName,
          photoUrl :    user.photos[0].value
        };
        userData.twitData = twitData;
      });
    };

    this.updateInstagramInfo = function() {
      $http.get('/api/instagram/currentUser').success(function(user) {
        var igData = {
          isLoggedIn :  true,
          userName : user.username,
          displayName : user.displayName,
          photoUrl : user._json.data.profile_picture
        };
        userData.igData = igData;
      });
    };
    
    this.updateYoutubeInfo = function() {
      $http.get('/api/youtube/currentUser').success(function(user) {
        var ytData =  {
          isLoggedIn :  true,
          userName : user._json.screen_name,
          displayName : user._json.name,
          photoUrl : user._json.picture
        };
        userData.ytData = ytData;
      });
    };
    this.clear = function(){
      userData.twitData = {isLoggedIn :  false};
      userData.igData = {isLoggedIn :  false};
      userData.ytData = {isLoggedIn :  false};
    }

    this.userData = userData;
  });