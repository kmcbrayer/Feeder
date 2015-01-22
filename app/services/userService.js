'use strict';

angular.module('feederApp')
  .factory('UserService', function(localStorage,$http) {
    var userData = {
      twitData: {isLoggedIn :  false},
      igData: {isLoggedIn :  false},
      ytData: {isLoggedIn :  false},
    };
    var twitData = {isLoggedIn :  false};
    var igData = {isLoggedIn :  false};
    var ytData = {isLoggedIn :  false};

    userData.updateTwitterInfo = function() {
      $http.get('/api/twitter/currentUser').success(function(user) {
        twitData = {
          isLoggedIn :  true,
          userName :    user._json.screen_name,
          displayName : user.displayName,
          photoUrl :    user.photos[0].value
        };
        userData.twitData = twitData;
        $rootScope.$broadcast('user-updated');
        return userData.twitData;//set if success
      });
      return userData.twitData;//return {} if not success
    };

    userData.updateInstagramInfo = function() {
      $http.get('/api/instagram/currentUser').success(function(user) {
        igData = {
          isLoggedIn :  true,
          userName : user.username,
          displayName : user.displayName,
          photoUrl : user._json.data.profile_picture
        };
        userData.igData = igData;
        return userData.igData;
      });
      return userData.igData;
    };
    
    userData.updateYoutubeInfo = function() {
      $http.get('/api/youtube/currentUser').success(function(user) {
        ytData =  {
          isLoggedIn :  true,
          userName : user._json.screen_name,
          displayName : user._json.name,
          photoUrl : user._json.picture
        };
        userData.ytData = ytData;
        return userData.ytData;
      });
      return userData.ytData;
    };
    userData.clear = function(){
      userData.twitData = {};
      userData.igData = {};
      userData.ytData = {};
    }

    //return service
    return userData;
  });