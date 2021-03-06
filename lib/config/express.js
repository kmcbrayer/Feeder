'use strict';

var express = require('express'),
    path = require('path'),
    passport = require('passport');

module.exports = function(app) {
  var rootPath = path.normalize(__dirname + '/../..');

  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
      }
      next();
    });

    app.use(express.static(path.join(rootPath, '.tmp')));
    app.use('/bower', express.static(path.join(rootPath, 'bower')));
    app.use(express.static(path.join(rootPath, 'app')));
    app.use(express.cookieParser('thiscookierocks'));
    app.use(express.session());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.errorHandler());

    app.set('views', rootPath + '/app');
  });

  app.configure('production', function(){
    app.use(express.static(path.join(rootPath, '.tmp')));
    app.use('/bower', express.static(path.join(rootPath, 'bower')));
    app.use(express.static(path.join(rootPath, 'app')));
    app.use(express.cookieParser('thiscookierocks'));
    app.use(express.session());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.errorHandler());

    app.set('views', rootPath + '/app');
  });

  app.configure(function(){
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));
    //se3t redirect url for auths
    app.use('/authin', function(req, res, next) {
      req.session.returnTo = req.path;
      next();
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // Router needs to be last
    app.use(app.router);
  });
};