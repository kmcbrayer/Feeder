'use strict';

exports.buildError = function(err) {
  console.log(err);
  var err = new Error();
  err.status = 304;
  return err;
}