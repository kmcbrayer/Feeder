'use strict';

angular.module('feederApp')
  .factory('UserService', function(localStorage,$http) {
    var userData = {};

    userData.getTwitterInfo = function() {
      if (!localStorage.getObject('twitUser') || localStorage.getObject('twitUser').userName === null) {
        $http.get('/api/twitter/currentUser').success(function(user) {
          return {
            userName :    user._json.screen_name,
            displayName : user.displayName,
            photoUrl :    user.photos[0].value
          };
        })
        
      }
    };

    userData.getInstagramInfo = function() {
      if (!localStorage.getObject('igUser') || localStorage.getObject('igUser').userName === null) {
        $http.get('/api/instagram/currentUser').success(function(user) {
          return {
            userName : user.username,
            displayName : user.displayName,
            photoUrl : user._json.data.profile_picture
          };
          
        })
      }
    };
    
    userData.getYoutubeInfo = function() {
      if (!localStorage.getObject('ytUser') || localStorage.getObject('ytUser').userName === null) {
        $http.get('/api/youtube/currentUser').success(function(user) {
          return {
            userName : user._json.screen_name,
            displayName : user._json.name,
            photoUrl : user._json.picture
          };
        })
      }
    };

    //return service
    return userData;
  });