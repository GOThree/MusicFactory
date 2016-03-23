import Account from '../dao/authentication-dao';
import {AuthenticationServices} from '../services/authentication-services';

export class AuthenticationController {
    static create(req:any, res:any):void {
        var email = req.body.email;
        var password = req.body.password;

        Account.create(email, password)
            .then(data => res.status(200).json({}))
            .catch(error => res.status(409).json(error)); //TODO: do not return the original error message to the client
    }

    static login(req: any, res:any):void {
            // issue token
            var token = AuthenticationServices.createToken(req.user);

            // once the user is logged in the token should be 
            // marked as valid for future authentication
            // Account.setValidatedToken(req.user.id, true);
            res.send({jwt: token});
    }
}
