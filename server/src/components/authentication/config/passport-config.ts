const EXPIRES_IN_SECONDS = 60 * 60 * 15;

// PoC ONLY!!!
var SECRET = process.env.tokenSecret || '4ukI0uIVnB3iI1bnmk646fVXSE18Vk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM';

var ALGORITHM = 'HS256';
var ISSUER = 'localhost';
var AUDIENCE = 'localhost';

var JWT_STRATEGY_CONFIG = {
  secretOrKey: SECRET,
  issuer : ISSUER,
  audience: AUDIENCE,
  passReqToCallback: false,
  algorithm: ALGORITHM,
  expiresIn: EXPIRES_IN_SECONDS
};

module.exports = JWT_STRATEGY_CONFIG;
