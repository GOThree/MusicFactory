import * as passport from 'passport';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import Account from '../components/authentication/dao/authentication-dao';
import {JwtStrategyConfig} from '../components/authentication/config/jwt-strategy-config';

export class AuthConfig {
    static init(app:any):void {
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
    }
};
