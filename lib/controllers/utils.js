'use strict';

var log = require('../config/winston');

exports.buildError = function(err) {
  log.debug(err)
  var err = new Error();
  err.status = 304;
  return err;
}