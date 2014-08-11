'use strict';

var path = require('path');

exports.partials = function(req, res) {
  res.sendfile('app'+req.url+'.html');
};

exports.index = function(req, res) {
  res.render('index');
};
