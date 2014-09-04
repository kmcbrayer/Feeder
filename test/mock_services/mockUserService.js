'use strict';

angular.module('feederApp')
  .factory('MockUserService', function(twitterUser, instagramUser, youtubeUser) {
    var userData = {};
    userData.getTwitterInfo = function() {
      return twitterUser;
    };
    userData.isLoggedIntoTwitter = function() {
      return true;
    }
    userData.getInstagramInfo = function() {
      return instagramUser;
    };
    userData.isLoggedIntoInstagram = function() {
      return true;
    }
    userData.getYoutubeInfo = function() {
      return youtubeUser;
    };
    userData.isLoggedIntoYoutube = function() {
      return true;
    }
    return userData;
  })