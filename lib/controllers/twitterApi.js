'use strict';

var twit = require('twit');
var secrets = require('./secrets');
var moment = require('moment');
var utils = require('./utils');
var log = require('../config/winston');

var T = new twit({
	consumer_key : secrets.twitter.consumerKey,
	consumer_secret : secrets.twitter.consumerSecret,
	access_token : secrets.twitter.accessToken,
	access_token_secret : secrets.twitter.accessSecret
});

exports.statuses = function(store) {
	return function(req,res) {
		if (!store.getItem('twitter_cache')) {
			log.debug("nothing in 'twitter_cache'");
			if(store.getItem('twit_data') !== null) {
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
								tw.userLink = data[i].user.url;
								tw.user = data[i].user.name;
								tw.photo = data[i].user.profile_image_url;
								dataList.push(tw);
							}
							log.debug("setting 'twitter_cache'");
							store.setItem('twitter_cache', JSON.stringify(dataList));
							res.json(dataList);
						} else {
		          res.send(utils.buildError(err));
	        	}
					}
				);
			}
			else{
				log.debug("user not logged into twitter");
				res.json({});
			}
		} else {
			log.debug("hit twitter_cache");
			res.json(JSON.parse(store.getItem('twitter_cache')));
		}
	}
};