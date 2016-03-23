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

            // once the user is logged in the token should be 
            // marked as valid for future authentication
            // the token will be marked as invalid once the 
            // user request password reset
            if(!req.user.validToken) {
                Account.setValidToken(req.user.id, true);
            }

            res.send({jwt: token});
    }

    // always send 200 OK because this can be abused to
    // find the usernames in the database
    static requestPasswordReset(req:any, res:any):void {
        var username = req.body.username;

        // TODO: finish the logic
        // 1) set passwordResetRequested to true
        // 2) create reset token user 'crypto'
        // 3) expiration date 
        Account.createResetPasswordToken(username).then((data) => {
            if (data) {
                console.log(data);
            }
        });

        // this will be executed before 
        // the .createResetPasswordToken() finishes
        res.send({});
    }
}
