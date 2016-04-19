import Account from '../dao/authentication-dao';
import {AuthenticationServices} from '../services/authentication-services';
import * as crypto from 'crypto';

export class AuthenticationController {

    static createValidation(req: any, res: any, next: any) {
        req.checkBody('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Email is not in the correct format');

        req.checkBody('password')
            .notEmpty().withMessage('Email is required');

        // return errors or continue
        AuthenticationController.checkForErrors(req, res, next);
    }

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
            res.send({jwt: token});
    }

    static changePassword(req: any, res: any) {
        var id = req.body.id;
        var resetToken = req.body.resetToken;
        var newPassword = req.body.newPassword;
        var confirmPassword = req.body.confirmPassword;

        var currentTime = new Date();

        // check the newPassword and confirmPassword are equal
        if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
            res.status(400).json('Password mismatch');
        }

        // TODO: 
        // - add proper error handling
        // - add logging
        // - add maxAttempts functionality for attempts to change the password
        // in case someone tries to brute-force the resetToken
        Account.getResetPasswordUser(id, resetToken, currentTime)
            .then((data) => {
                if(data) {
                    data.setPassword(newPassword, function(err, data) {
                        if(err) {
                            console.log(err);
                            res.status(400).send();
                        } else {
                            data.passwordResetOn = new Date();
                            data.passwordResetToken = null;
                            data.passwordResetTokenExpirationDate = null;
                            data.save();
                            res.status(200).send();
                        }
                    });
                } else {
                    console.log('Id and token doesn\'t match');
                    res.status(400).send();
                }
            })
            .catch(error => {
                console.log(error);
                res.status(400).send();
            });
    }

    static requestPasswordResetValidation(req: any, res: any, next: any):void {
        req.checkBody('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Email is not in the correct format');

        // return errors or continue
        AuthenticationController.checkForErrors(req, res, next);
    }

    // always send 200 OK because this can be abused to
    // find the usernames in the database
    static requestPasswordReset(req:any, res:any):void {
        var username = req.body.email;

        // the duration in hours for how long 
        // the reset token will be valid
        var resetTokenValidUntil = 4;

        // create password reset token
        Account.getUserByEmail(username).then((data) => {
            if (data) {
                // create password reset token
                crypto.randomBytes(48, function(ex, buf) {
                    var passwordResetToken = buf.toString('hex');

                    // set the reset token expiration date
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

    private static checkForErrors(req: any, res: any, next: any):void {
        var errors = req.validationErrors();
        if (errors) {
            res.send(JSON.stringify(errors), 400);
            return;
        }

        next();
    }
}
