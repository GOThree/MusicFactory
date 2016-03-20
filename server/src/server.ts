/// <reference path="../typings/main.d.ts" />

var PORT = process.env.PORT || 3333;

import * as express from 'express';
import * as os from 'os';
import * as cors from 'cors';
import * as morgan from 'morgan';
import {RoutesConfig} from './config/routes.conf';
import {DBConfig} from './config/db';
import {Routes} from './routes/public/index';
import {AuthenticatedRoutes} from './routes/authenticated/index';
import * as passport from 'passport';
import Account from './components/authentication/dao/authentication-dao';
import * as bodyParser from 'body-parser';
import {JwtStrategyConfig} from './components/authentication/config/jwt-strategy-config';
import logger from './config/logger.conf';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const app = express();
/* tslint:disable */
const server = app.listen(PORT);
/* tslint:enable */
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Authentication
app.use(passport.initialize());
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// jwt token authentication
JwtStrategyConfig.jwtFromRequest = ExtractJwt.fromAuthHeader();
passport.use(new JwtStrategy(JwtStrategyConfig, function(jwt_payload, done) {
    // get user ID
    if(!jwt_payload.uid) {
        return done('Missing uid in payload', false);
    }
    var userId = jwt_payload.uid;

    // find the user by ID
    Account.findById(userId, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

var winstonStream = {
  write: function(message){
    logger.info(message);
  }
}

app.use(cors());
app.use(morgan('dev', { stream: winstonStream }));
DBConfig.init();
RoutesConfig.init(app, express);
Routes.init(app, express.Router());
AuthenticatedRoutes.init(app, express.Router());

logger.debug(`up and running @: ${os.hostname()} on port: ${PORT}`);
logger.debug(`enviroment: ${process.env.NODE_ENV}`);
