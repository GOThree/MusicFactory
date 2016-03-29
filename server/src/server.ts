/// <reference path="../typings/main.d.ts" />

var PORT = process.env.PORT || 3333;

import * as express from 'express';
import * as os from 'os';
import * as cors from 'cors';
import * as morgan from 'morgan';
import {RoutesConfig} from './config/routes.config';
import {AuthConfig} from './config/auth.config';
import {DBConfig} from './config/db.config';
import logger from './config/logger.config';

const app = express();

AuthConfig.init(app);
RoutesConfig.init(app);
DBConfig.init();

app.use(cors());

// Logging
var winstonStream = {
  write: function(message){
    logger.info(message);
  }
};

app.use(morgan('dev', { stream: winstonStream }));

app.listen(PORT, function(){
    logger.debug(`up and running @: ${os.hostname()} on port: ${PORT}`);
    logger.debug(`enviroment: ${process.env.NODE_ENV || 'development'}`);
});

