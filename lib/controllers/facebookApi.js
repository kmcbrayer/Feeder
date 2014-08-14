'use strict'

var FB = require('fb');

exports.feed = function(store) {
  return function(req,res) {
    FB.api('/me/feed',
      'GET',
      {
        access_token: store.getItem('fb_token'),
        limit : 50
      },
      function(data) {
        //need error checking
        return res.json(data)
      })
  }
}