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
          console.log(dataList[1]);
          for (var i=0;i<dataList.length;i++){
            var ytItem = {};
            ytItem.type = 'youtube';
            ytItem.videoId = dataList[i].contentDetails.upload.videoId
            ytItem.date = moment(dataList[i].snippet.publishedAt);
            ytItem.title = dataList[i].snippet.title;
            ytItem.thumb = dataList[i].snippet.thumbnails.default.url;
            ytItem.channelTitle = dataList[i].snippet.channelTitle;
            subs.push(ytItem);
          }
          console.log(subs[1]);
          store.setItem('youtube_cache', JSON.stringify(subs));
          return res.json(subs);
        } else if(err) {
          console.log(err);
          var err = new Error();
          err.status = 304;
          res.send(err);
        }
      });
    }
    else {
      res.json(JSON.parse(store.getItem('youtube_cache')))
    }
  }
}