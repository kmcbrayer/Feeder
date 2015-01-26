'use strict';

// Module dependencies.
var express = require('express');
var passport = require('passport');
var Storage = require('dom-storage');
var log = require('./lib/config/winston');
var twitAPI = require('./lib/controllers/twitterApi');
var ytAPI = require('./lib/controllers/youtubeApi');
var igAPI = require('./lib/controllers/instagramApi');

log.info("start app");
// Setup session storage
var store = new Storage(null, {strict:true});

// init app
var app = express();

// Express Configuration
require('./lib/config/express')(app);
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
//utils
app.get('/api/clear', api.clear(store));
//reddit
app.get('/api/redditAww', api.redditAww);
//twitter
app.get('/api/twitter/currentUser', api.twitUser(store));
app.get('/api/twitter/statuses', twitAPI.statuses(store));
//youtube
app.get('/api/youtube/currentUser', api.ytUser(store));
app.get('/api/youtube/subscriptions', ytAPI.subscriptions(store));
//instagram
app.get('/api/instagram/currentUser', api.igUser(store));
app.get('/api/instagram/feed', igAPI.feed(store));



// Angular Routes
app.get('/images/*', index.images);
app.get('/*', index.index);


// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
module.exports = app;
