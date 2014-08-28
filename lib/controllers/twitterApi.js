'use strict';

var twit = require('twit');
var secrets = require('./secrets');
var moment = require('moment');

var T = new twit({
	consumer_key : secrets.twitter.consumerKey,
	consumer_secret : secrets.twitter.consumerSecret,
	access_token : secrets.twitter.accessToken,
	access_token_secret : secrets.twitter.accessSecret
})

exports.statuses = function(store) {
	return function(req,res) {
		if (!store.getItem('twitter_cache')) {
			console.log('did not hit twitter_cache');
			T.get(
				'statuses/home_timeline',
				{ user_id : req.user.id },
				function(err, data, response) {
					if (!err) {
						var dataList = [];
						for (var i=0;i<data.length;i++) {
							var tw = {};
							tw.type = 'twitter';
							tw.date = moment(data[i].created_at);
							tw.caption = data[i].text;
							tw.entities = data[i].user.entities;
							tw.user = data[i].user.name;
							tw.photo = data[i].user.profile_image_url;
							dataList.push(tw);
						}
						store.setItem('twitter_cache', JSON.stringify(dataList));
						res.json(dataList);
					} else if(err) {
          console.log(err);
        	}
				}
			);
		} else {
			res.json(JSON.parse(store.getItem('twitter_cache')));
		}
	}
};