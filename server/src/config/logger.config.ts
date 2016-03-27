/// <reference path="../../typings/main.d.ts" />

import {join} from 'path';
import * as winston from 'winston';
const FILE_PATH = join(__dirname, '../all-logs.log');

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: FILE_PATH,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

export default logger;
