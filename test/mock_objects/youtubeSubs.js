'use strict';

angular.module('feederApp')
  .value('youtubeSubs', 
  [
    {
      "type" : "youtube",
      "videoId" : 777,
      "date" : "a date string",
      "title" : "a title",
      "thumb" : "url to thumb",
      "channelTitle" : "A channel title"
    },
    {
      "type" : "youtube",
      "videoId" : 722,
      "date" : "a date string",
      "title" : "a title",
      "thumb" : "url to thumb",
      "channelTitle" : "A channel title"
    },
  ]
);