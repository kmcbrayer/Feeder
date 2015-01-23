'use strict';

var Youtube = require('youtube-api');
var secrets = require('./secrets');
var moment = require('moment');
var utils = require('./utils');
var log = require('../config/winston');

exports.subscriptions = function(store) {
  return function(req,res) {
    Youtube.authenticate({
      type: "oauth",
      token: store.getItem('yt_token')
    });
    if (JSON.parse(store.getItem('youtube_cache')) === null){
      log.info('did not hit youtube_cache');
      if(JSON.parse(store.getItem('yt_data')) !== null) {
        Youtube.activities.list({
          "part": "snippet,contentDetails",
          "home": true, 
          "maxResults": 20
        },
        function(err,data) {
          if (data){
            var dataList = [];
            var subs = [];
            for (var i=0; i< data.items.length; i++){
              if (data.items[i].snippet.type === 'upload') {
                dataList.push(data.items[i]);
              }
            }
            for (var i=0;i<dataList.length;i++){
              var ytItem = {};
              ytItem.type = 'youtube';
              ytItem.videoId = dataList[i].contentDetails.upload.videoId
              ytItem.date = moment(dataList[i].snippet.publishedAt);
              ytItem.title = dataList[i].snippet.title;
              ytItem.description = dataList[i].snippet.description;
              ytItem.thumb = dataList[i].snippet.thumbnails.default.url;
              ytItem.channelTitle = dataList[i].snippet.channelTitle;
              subs.push(ytItem);
            }
            store.setItem('youtube_cache', JSON.stringify(subs));
            return res.json(subs);
          }
          if (err) {
            res.send(utils.buildError(err));
          }
        });
      } else {
        log.info('user not logged in to youtube');
        res.json({});
      }
    }
    else {
      res.json(JSON.parse(store.getItem('youtube_cache')))
    }
  }
}