import Account from '../dao/authentication-dao';
import {AuthenticationServices} from '../services/authentication-services';
import * as crypto from 'crypto';

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

    // always send 200 OK because this can be abused to
    // find the usernames in the database
    static requestPasswordReset(req:any, res:any):void {
        var username = req.body.username;

        // the duration in hours for how long 
        // the reset token will be valid
        var resetTokenValidUntil = 4;
        
        // create password reset token
        Account.getUserByEmail(username).then((data) => {
            if (data) {
                // create password reset token
                crypto.randomBytes(48, function(ex, buf) {
                    var passwordResetToken = buf.toString('hex');

                    // set the reset token valid until date
                    var validUntil = new Date();
                    validUntil.setHours(validUntil.getHours() + resetTokenValidUntil);

                    Account.setPasswordReset(data.id, passwordResetToken, validUntil).then(() => {
                        // TODO: send e-mail with the password reset url
                        console.log('password reset token: ' + passwordResetToken + 
                        '\nuser id: ' + data.id);
                    }).catch(() => {
                        console.log('password reset error');
                    });
                });
            }
        });

        // this will be executed before 
        // the .getUserByEmail() finishes
        res.send({});
    }
}
