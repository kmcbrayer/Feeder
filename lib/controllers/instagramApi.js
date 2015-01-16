'use strict';

var Instagram = require('instagram-node-lib');
var secrets = require('./secrets');
var log = require('../config/winston');
var moment = require('moment');
var utils = require('./utils');

Instagram.set('client_id', secrets.instagram.app_id);
Instagram.set('client_secret', secrets.instagram.app_secret);

exports.feed = function(store) {
  return function(req,res) {
    if(!store.getItem('instagram_cache')) {
      log.info('did not hit instagram_cache');
      Instagram.users.self({
        access_token : store.getItem('ig_token'),
        count : 20,
        complete: function(data) {
          var dataList = [];
          for (var i=0;i<data.length;i++) {
            var ig = {};
            ig.type = 'instagram';
            ig.date = moment.unix(data[i].created_time); 
            ig.photo = data[i].images.thumbnail.url;
            ig.user = data[i].user.username;
            ig.likeCount = data[i].likes.count;
            if (data[i].caption)
              ig.caption = data[i].caption.text;
            ig.link = data[i].link;
            dataList.push(ig);
          }
          store.setItem('instagram_cache', JSON.stringify(dataList))
          res.json(dataList);
        },
        error : function(err) {
          utils.buildError(err);
        }
      });
    } else {
      res.json(JSON.parse(store.getItem('instagram_cache')));
    }
  }
}

