'use strict';

var twit = require('twit');
var secrets = require('./secrets');

var T = new twit({
	consumer_key : secrets.twitter.consumerKey,
	consumer_secret : secrets.twitter.consumerSecret,
	access_token : secrets.twitter.accessToken,
	access_token_secret : secrets.twitter.accessSecret
})

exports.statuses = function(req,res) {
	if (req.user){
		T.get(
			'statuses/home_timeline',
			{ user_id : req.user.id },
			function(err, data, response) {
				if (!err)
					res.json(data);
			}
		);
	}
};