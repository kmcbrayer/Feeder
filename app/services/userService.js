'use strict';

angular.module('feederApp')
  .factory('UserService', function() {
    return {
      info : {
        twitter : {
          userName : null,
          displayName : null,
          photoUrl : null
        },
        youtube : {
          userName : null,
          displayName : null,
          photoUrl : null
        },
        instagram : {
          userName : null,
          displayName : null,
          photoUrl : null
        }
      },
      isLoggedIntoTwitter : false,
      isLoggedIntoYoutube : false,
      isLoggedIntoInstagram : false
    }
  });