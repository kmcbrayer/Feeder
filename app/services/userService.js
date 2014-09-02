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
          console.log('here')
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

    //return service
    return userData;
  });

/*
$http.get('/api/twitter/currentUser').success(function(user) {

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
      };
    }
    return {
      getTwitterInfo : function() {
        return userData.info.twitter();
      },
    };
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
*/