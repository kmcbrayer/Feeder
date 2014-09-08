'use strict';

var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var secrets = require('../controllers/secrets');

module.exports = function(app,passport,store) {
  passport.use(new InstagramStrategy({
    clientID: secrets.instagram.app_id,
    clientSecret: secrets.instagram.app_secret,
    callbackURL: "http://www.kmcbrayer.com:3000/auth/instagram/callback"
  },
  function(token, refreshToken, profile, done) {
    store.setItem('ig_token', token);
    store.setItem('ig_data', JSON.stringify(profile));
    return done(null, profile);
  }
  ));
  app.get('/authin/instagram', passport.authenticate('instagram'));

app.get('/auth/instagram/callback', 
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  });


}