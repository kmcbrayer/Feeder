'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var secrets = require('../controllers/secrets');
var config = require('./config');

module.exports = function(app,passport,store) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  console.log(config);
  passport.use(new TwitterStrategy({
    consumerKey: secrets.twitter.consumerKey,
    consumerSecret: secrets.twitter.consumerSecret,
    callbackURL: "http://"+config.siteName+"/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      store.setItem('twit_data', JSON.stringify(profile));
      return done(null, profile);
    });
  }
  ));
  // Twitter Routes
  app.get('/authin/twitter', 
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
      res.redirect('/');
    }
  );
}