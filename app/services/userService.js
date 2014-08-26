'use strict';

angular.module('feederApp')
  .factory('UserService', function(localStorage) {
    var userData = null;
    if (localStorage.getObject('userData')) {
      userData = localStorage.getObject('userData');
    } else {
      userData = {
        info : {
          twitter : {
            userName :    null,
            displayName : null,
            photoUrl :    null
          },
          youtube : {
            userName :    null,
            displayName : null,
            photoUrl :    null
          },
          instagram : {
            userName :    null,
            displayName : null,
            photoUrl :    null
          }
        },
        isLoggedIntoTwitter :     false,
        isLoggedIntoYoutube :     false,
        isLoggedIntoInstagram :   false
      }
    }

    var ret = {
      "userData" : userData,
      setUserData : function(type, data) {
        if (type === 'twitter'){
          userData.info.twitter = data;
        } 
        if (type === 'instagram') {
          userData.info.instagram = data;
        }
        if (type === 'youtube') {
          userData.info.youtube = data;
        }

        localStorage.setObject('userData', userData);
      },
      setLoggedIn : function(type,bool) {
        if (type === 'twitter'){
          userData.isLoggedIntoTwitter = bool;
        } 
        if (type === 'instagram') {
          userData.isLoggedIntoInstagram = bool;
        }
        if (type === 'youtube') {
          userData.isLoggedIntoYoutube = bool;
        }

        localStorage.setObject('userData', userData);
      }
    };
    return ret;
  });