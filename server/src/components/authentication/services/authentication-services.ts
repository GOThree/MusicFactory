var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/passport-config');

function createToken(user) {
    // PoC Only because it sends the hash and salt!
    return jwt.sign({
        uid: user.id
    },
    jwtConfig.secretOrKey,
    {
        algorithm: jwtConfig.algorithm,
        expiresInMinutes: jwtConfig.expiresInMinutes,
        issuer: jwtConfig.issuer,
        audience: jwtConfig.audience
    });
}

module.exports = {
    createToken: createToken
};
