'use strict';

var request = require('request');

exports.redditAww = function(req,res){
  var response_data = [];
  var webpage = 'http://www.reddit.com/r/aww.json?limit=5';
  request({uri : webpage, json:true, headers:{useragern:'mybot 0.0.1'}},function(error, response, body){
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

exports.user = function(req,res){
  return res.json(req.user);
}