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
					var dataList = [];
					for (var i=0;i<data.length;i++) {
						var tw = {};
						tw.type = 'twitter';
						tw.date = data[i].created_at;
						tw.caption = data[i].text;
						tw.user = data[i].user.name;
						//get profile pic:
						dataList.push(tw);
					}
					res.json(dataList);
			}
		);
	}
};