'use strict';

var request = require('request');

exports.redditAww = function(req,res){
  var response_data = [];
  var webpage = 'http://www.reddit.com/r/aww.json?limit=5';
  request({uri : webpage, json:true, headers:{useragent:'mybot 0.0.1'}},function(error, response, body){
    if(!error && response.statusCode === 200) {
      for (var i=0;i<body.data.children.length;i++){
        response_data.push({
          "index":i+1,//i dont know why but I like it better this way
          "title":body.data.children[i].data.title,
          "thumbnail":body.data.children[i].data.thumbnail
        });
      }
      return res.json(response_data);
    }else{
      return res.json(["no reddit data"]);
    }
    
  });
};

exports.fbUser = function(store){
  return function(req,res,err){
    if (store.getItem('fb_data') !== null)
      return res.json(JSON.parse(store.getItem('fb_data')));
  }
};
exports.twitUser = function(store){
  return function(req,res,err){
    if (store.getItem('twit_data') !== null){
      return res.json(JSON.parse(store.getItem('twit_data')));
    } else {
      return res.send(500, {error: "not logged in"});
    }
  }
}
exports.ytUser = function(store){
  return function(req,res,err) {
    if (store.getItem('yt_data') !== null)
      return res.json(JSON.parse(store.getItem('yt_data')));
  }
}
exports.igUser = function(store){
  return function(req,res,err) {
    if (store.getItem('ig_data') !== null) {
      return res.json(JSON.parse(store.getItem('ig_data')));
    } else {
      return res.send(500, {error: "not logged in"});
    }
  }
}
