'use strict';

// Module dependencies.
var express = require('express');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: 'fJyZKWakTGLsZoDJR5EjMBv8C',//TWITTER_CONSUMER_KEY,
    consumerSecret: 'TJKuprjkz7m266gLGI0If4yJyKTDOMWOGZgSWhZLZSsLU6dnet',//TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log(profile);
      // To keep the example simple, the user's Twitter profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Twitter account with a user record in your database,
      // and return that user instead.
      return done(null, user);
    });
  }
));


// Express Configuration
require('./lib/config/express')(app);

// Controllers
var api = require('./lib/controllers/api'),
    index = require('./lib/controllers');

// Server Routes
app.get('/api/redditAww', api.redditAww);
app.get('/api/currentUser', api.user);

// Twitter Routes
app.get('/auth/twitter',
  passport.authenticate('twitter'),
  function(req, res){
    // The request will be redirected to Twitter
  });
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    for (var i in req){console.log(i)};
    res.redirect('/');
  });

// Angular Routes
app.get('/partials/*', index.partials);
app.get('/*', index.index);


// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;