var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/passport/jwt');

function createToken(user) {
    // PoC Only because it sends the hash and salt!
    return jwt.sign({
        user: user.toJSON()
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
}
