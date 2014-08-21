'use strict';

// Module dependencies.
var express = require('express');
var passport = require('passport');
var Storage = require('dom-storage');
var twitAPI = require('./lib/controllers/twitterApi');
var fbAPI = require('./lib/controllers/facebookApi');
var ytAPI = require('./lib/controllers/youtubeApi');
var igAPI = require('./lib/controllers/instagramApi');

// Setup session storage
var store = new Storage(null, {strict:true});

// init app
var app = express();

// Express Configuration
require('./lib/config/express')(app);
//facebook auth config
require('./lib/config/fb_login')(app,passport,store);
// Twitter Auth Config
require('./lib/config/twit_login')(app,passport,store);
// Youtube Auth Config
require('./lib/config/yt_login')(app,passport,store);
// Instagram Auth Config
require('./lib/config/ig_login')(app,passport,store);



// Controllers
var api = require('./lib/controllers/api'),
    index = require('./lib/controllers');

// Server Routes
//reddit
app.get('/api/redditAww', api.redditAww);
//facebook
app.get('/api/facebook/currentUser', api.fbUser(store));
app.get('/api/facebook/feed', fbAPI.feed)
//twitter
app.get('/api/twitter/currentUser', api.twitUser(store));
app.get('/api/twitter/statuses', twitAPI.statuses)
//youtube
app.get('/api/youtube/currentUser', api.ytUser(store));
app.get('/api/youtube/subscriptions', ytAPI.subscriptions(store));
//instagram
app.get('/api/instagram/currentUser', api.igUser(store));
app.get('/api/instagram/feed', igAPI.feed(store));



// Angular Routes
app.get('/*', index.index);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;