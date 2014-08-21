'use strict';

var Youtube = require('youtube-api');
var secrets = require('./secrets');

exports.subscriptions = function(store) {
  return function(req,res) {
    Youtube.authenticate({
      type: "oauth",
      token: store.getItem('yt_token')
    });

    Youtube.activities.list({
      "part": "snippet",
      "home": true, 
      "maxResults": 20
    },
    function(err,data) {
      if (data){
        var dataList = [];
        var subs = []
        for (var i=0; i< data.items.length; i++){
          if (data.items[i].snippet.type === 'upload'){
            dataList.push(data.items[i].snippet);
          }
        }
        for (var i=0;i<dataList.length;i++){
          var ytItem = {};
          ytItem.type = 'youtube';
          ytItem.date = dataList[i].publishedAt;
          ytItem.title = dataList[i].title;
          ytItem.thumb = dataList[i].thumbnails.default.url;
          ytItem.channelTitle = dataList[i].channelTitle;
          // get link ytItem.link = dataList[i].
          subs.push(ytItem);
        }
        return res.json(subs);
      }
    });
  }
}