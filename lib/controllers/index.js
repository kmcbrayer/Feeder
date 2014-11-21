'use strict';

exports.partials = function(req, res) {
  res.sendfile('app'+req.url+'.html');
};

exports.images = function(req, res) {
  res.sendfile('app'+req.url);
};

exports.index = function(req, res) {
  res.render('index');
};