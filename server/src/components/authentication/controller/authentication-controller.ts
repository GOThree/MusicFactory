import Account from '../dao/authentication-dao';
import {AuthenticationServices} from '../services/authentication-services';

export class AuthenticationController {
    static create(req:any, res:any):void {
        var email = req.body.username;
        var password = req.body.password;

        Account.create(email, password)
            .then(data => res.status(200).json({}))
            .catch(error => res.status(409).json(error)); //TODO: do not return the original error message to the client
    }

    static login(req: any, res:any):void {
            // issue token
            var token = AuthenticationServices.createToken(req.user);
            res.send({jwt: token});
    }
}
