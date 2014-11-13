'use strict';

var ret = {};
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
  ret.siteName = 'www.devsite.com:9000';
} else {
  ret.siteName = 'www.kmcbrayer.com:3000';
}

module.exports = ret;