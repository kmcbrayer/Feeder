'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var secrets = require('../controllers/secrets');

module.exports = function(app,passport,store) {
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
      store.setItem('twit_data', JSON.stringify(profile));
      return done(null, profile);
    });
  }
  ));
  // Twitter Routes
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
}