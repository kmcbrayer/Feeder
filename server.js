'use strict';

// Module dependencies.
var express = require('express');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var secrets = require('./lib/controllers/secrets');
var twitAPI = require('./lib/controllers/twitterApi');
// init app
var app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: secrets.twitter.consumerKey,
    consumerSecret: secrets.twitter.consumerSecret,
    callbackURL: "http://www.devsite.com:9000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
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
app.get('/api/twitter/statuses', twitAPI.statuses)
app.get('/auth/twitter', 
	passport.authenticate('twitter'), 
	function(req, res){
    // The request will be redirected to Twitter
  }
);
app.get('/auth/twitter/callback', 
	passport.authenticate(
		'twitter', 
		{ failureRedirect: '/login' }
	),
	function(req, res) {
		res.redirect('/twitter');
	}
);
// Angular Routes
app.get('/**/:fileName', index.partials);
app.get('/*', index.index);


// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;