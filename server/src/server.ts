/// <reference path="../typings/main.d.ts" />

var PORT = process.env.PORT || 3333;

import * as express from 'express';
import * as os from 'os';
import * as cors from 'cors';
import {RoutesConfig} from './config/routes.conf';
import {DBConfig} from './config/db';
import {Routes} from './routes/index';
import * as passport from 'passport';
import {Strategy} from 'passport-local';
import Account from './components/authentication/dao/authentication-dao';
import * as bodyParser from 'body-parser';
const jwtConfig = require('./components/authentication/config/passport-config');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = Strategy;

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
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// jwt token authentication
jwtConfig.jwtFromRequest = ExtractJwt.fromAuthHeader();
passport.use(new JwtStrategy(jwtConfig, function(jwt_payload, done) {
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

DBConfig.init();
RoutesConfig.init(app, express);
Routes.init(app, express.Router());

console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
console.log(`enviroment: ${process.env.NODE_ENV}`);
