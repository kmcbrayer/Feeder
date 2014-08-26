'use strict';

var Youtube = require('youtube-api');
var secrets = require('./secrets');
var moment = require('moment');

exports.subscriptions = function(store) {
  return function(req,res) {
    Youtube.authenticate({
      type: "oauth",
      token: store.getItem('yt_token')
    });
    if (!store.getItem('youtube_cache')){
      console.log('did not hit youtube_cache');
      Youtube.activities.list({
        "part": "snippet",
        "home": true, 
        "maxResults": 20
      },
      function(err,data) {
        if (data){
          var dataList = [];
          var subs = []
          console.log(data.items[1])
          for (var i=0; i< data.items.length; i++){
            if (data.items[i].snippet.type === 'upload'){
              dataList.push(data.items[i].snippet);
            }
          }
          for (var i=0;i<dataList.length;i++){
            var ytItem = {};
            ytItem.type = 'youtube';
            ytItem.date = moment(dataList[i].publishedAt);
            ytItem.title = dataList[i].title;
            ytItem.thumb = dataList[i].thumbnails.default.url;
            ytItem.channelTitle = dataList[i].channelTitle;
            subs.push(ytItem);
          }
          store.setItem('youtube_cache', JSON.stringify(subs));
          return res.json(subs);
        } else if(err) {
          console.log(err);
        }
      });
    }
    else {
      res.json(JSON.parse(store.getItem('youtube_cache')))
    }
  }
}