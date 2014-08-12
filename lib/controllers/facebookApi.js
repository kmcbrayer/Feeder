'use strict';

var FB = require('fb');

exports.feed = function(store) {
	return function(req,res){
		FB.api('/me/feed',
			'GET',
			{
				access_token: store.getItem('fb_token'),
				limit :  20
			}, 
			function(data) {
				if(!res || res.error) {
			   console.log(!res ? 'error occurred' : res.error);
			   return;
		  	}
		  console.log(data)
		  return res.json(data);
		});
	}
}
