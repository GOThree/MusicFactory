const EXPIRES_IN_SECONDS = 60 * 60 * 15;

// PoC ONLY!!!
const SECRET = process.env.tokenSecret || '4ukI0uIVnB3iI1bnmk646fVXSE18Vk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM';
const ALGORITHM = 'HS256';
const ISSUER = 'localhost';
const AUDIENCE = 'localhost';

export class JwtStrategyConfig {
    public static get secretOrKey() : string { return SECRET; }
    public static get issuer() : string { return ISSUER; }
    public static get audience(): string { return AUDIENCE; }
    public static get passReqToCallback(): boolean {  return false; }
    public static get algorithm(): string  { return ALGORITHM;  };
    public static get expiresIn(): number { return EXPIRES_IN_SECONDS; };
    public static jwtFromRequest;
}
