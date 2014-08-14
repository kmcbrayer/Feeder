'use strict';

var FacebookStrategy = require('passport-facebook').Strategy
var passport = require('passport');
var secrets = require('../controllers/secrets');


module.exports = function(app,passport,store) {
  passport.use(new FacebookStrategy({
      clientID        : secrets.facebook.app_id,
      clientSecret    : secrets.facebook.app_secret,
      callbackURL     : "http://www.devsite.com:9000/auth/facebook/callback"
    },
    function(token, refreshToken, profile, done) {
      process.nextTick(function(){
        //store userdata here
        store.setItem('fb_data', JSON.stringify(profile));
        return done(null, profile);
      });
    }
  ));

  // Facebook Routes
  app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req,res){
      // The request will be redirected to Facebook
    }
  );
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook',{
      failureRedirect: '/login'
    }),
    function(req,res) {
      res.redirect('/facebook');
    }
  );
}