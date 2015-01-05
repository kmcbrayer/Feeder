'use strict';
//send angular partials
exports.partials = function(req, res) {
  res.sendfile('app'+req.url+'.html');
};
//send static files(images, js, css)
exports.images = function(req, res) {
  res.sendfile('app'+req.url);
};

exports.index = function(req, res) {
  res.render('index');
};