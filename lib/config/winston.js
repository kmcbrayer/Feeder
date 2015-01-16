'use strict';

var winston = require('winston');
winston.emitErrs = true;

//setup logging
var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      handleExceptions: true,
      timestamp: true,
      colorize: false,
      filename: './logs/all-logs.log',
      json: false,
      maxsize: 5242880, //5MB
      maxFiles: 5,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions:true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
}