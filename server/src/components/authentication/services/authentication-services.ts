var jwt = require('jsonwebtoken');
import {JwtStrategyConfig} from '../config/jwt-strategy-config';

export class AuthenticationServices {
    static createToken(user) {
         return jwt.sign({
            uid: user.id
            },
            JwtStrategyConfig.secretOrKey,
            {
                algorithm: JwtStrategyConfig.algorithm,
                expiresIn: JwtStrategyConfig.expiresIn,
                issuer: JwtStrategyConfig.issuer,
                audience: JwtStrategyConfig.audience
        });
    }
}
