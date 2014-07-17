'use strict';

var request = require('request');

exports.awesomeThings = function(req, res) {
  res.json([
    {
      name : 'HTML5 Boilerplate',
      info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
      awesomeness: 10
    }, {
      name : 'AngularJS',
      info : 'AngularJS is a toolset for building the framework most suited to your application development.',
      awesomeness: 10
    }, {
      name : 'Karma',
      info : 'Spectacular Test Runner for JavaScript.',
      awesomeness: 10
    }, {
      name : 'Express',
      info : 'Flexible and minimalist web application framework for node.js.',
      awesomeness: 10
    }
  ]);
};
function sanitizeReddit(data){
  var response_data = [];
  for (var i=0;i<data.length;i++){
    response_data.push({
      "index":i+1,//i dont know why but I like it better this way
      "title":data[i].data.title,
      "thumbnail":data[i].data.thumbnail
    });
  }
  console.log(response_data);
  return response_data;
}

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
