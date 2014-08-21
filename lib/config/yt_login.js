'use strict';

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');
var secrets = require('../controllers/secrets');

module.exports = function(app,passport,store) {
  passport.use(new GoogleStrategy({
      clientID        : secrets.youtube.app_id,
      clientSecret    : secrets.youtube.app_secret,
      callbackURL     : "http://www.devsite.com:9000/auth/youtube/callback"
    },
    function(token, tokenSecret, profile, done) {
      process.nextTick(function(){
        //store userdata here
        store.setItem('yt_token', token);
        store.setItem('yt_data', JSON.stringify(profile));
        return done(null, profile);
      });
    }
  ));

  // Youtube Routes
  app.get('/authin/youtube',
    passport.authenticate('google',{scope: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/plus.login'
      ]
    }),
    function(req,res){
      // The request will be redirected to youtube
    }
  );
  app.get('/auth/youtube/callback',
    passport.authenticate('google',{
      failureRedirect: '/login'
    }),
    function(req,res) {
      res.redirect(req.session.returnTo);
    }
  );
}