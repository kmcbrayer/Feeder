'use strict';

angular.module('feederApp')
  .factory('UserService', function(localStorage,$http) {
    var userData = {};

    userData.isLoggedIntoTwitter = function() {
      if (!localStorage.getObject('twitUser') || localStorage.getObject('twitUser').userName === null) {
        return false;
      } else {
        return true;
      }
    };
    userData.getTwitterInfo = function() {
      if (!localStorage.getObject('twitUser') || localStorage.getObject('twitUser').userName === null) {
        $http.get('/api/twitter/currentUser').success(function(user) {
          var twit = {
            userName :    user._json.screen_name,
            displayName : user.displayName,
            photoUrl :    user.photos[0].value
          };
          localStorage.setObject('twitUser', twit);
        })
        .error(function(err) {
          var twit = {
            userName :    null,
            displayName : null,
            photoUrl :    null
          };
          localStorage.setObject('twitUser', twit);
        });
      }
      return localStorage.getObject('twitUser');
    };

    userData.isLoggedIntoInstagram = function() {
      if (!localStorage.getObject('igUser') || localStorage.getObject('igUser').userName === null) {
        return false;
      } else {
        return true;
      }
    };

    userData.getInstagramInfo = function() {
      if (!localStorage.getObject('igUser') || localStorage.getObject('igUser').userName === null) {
        $http.get('/api/instagram/currentUser').success(function(user) {
          var userData = {
            userName : user.username,
            displayName : user.displayName,
            photoUrl : user._json.data.profile_picture
          };
          localStorage.setObject('igUser', userData);
        })
        .error(function(err) {
          var userData = {
            userName :    null,
            displayName : null,
            photoUrl :    null
          };
          localStorage.setObject('igUser', userData);
        });
      }
      return localStorage.getObject('igUser');
    };
    userData.isLoggedIntoYoutube = function() {
      if (!localStorage.getObject('ytUser') || localStorage.getObject('ytUser').userName === null) {
        return false;
      } else {
        return true;
      }
    };
    userData.getYoutubeInfo = function() {
      if (!localStorage.getObject('ytUser') || localStorage.getObject('ytUser').userName === null) {
        $http.get('/api/youtube/currentUser').success(function(user) {
          var ytUser = {
            userName : user._json.screen_name,
            displayName : user._json.name,
            photoUrl : user._json.picture
          };
          localStorage.setObject('ytUser', ytUser);
        })
        .error(function(err) {
          var ytUser = {
            userName :    null,
            displayName : null,
            photoUrl :    null
          };
          localStorage.setObject('ytUser', ytUser);
        });
      }
      return localStorage.getObject('ytUser');
    };

    //return service
    return userData;
  });