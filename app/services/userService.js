'use strict';

angular.module('feederApp')
  .factory('UserService', function(localStorage) {
    var userData = {};
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
      setUserData : function() {
        localStorage.setObject('userData', userData);
      }
    };
    return ret;
  });