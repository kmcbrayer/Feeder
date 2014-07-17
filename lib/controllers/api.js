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

exports.redditAww = function(req,res){
  var response_data;
  var webpage = 'http://www.reddit.com/r/aww.json';
  request({uri : webpage, json:true, headers:{useragern:'mybot 0.0.1'}},function(error, response, body){
    if(!error && response.statusCode == 200) {
         response_data = body.data.children;
         console.log(response_data);
    }
  });
  res.json(response_data);
};
