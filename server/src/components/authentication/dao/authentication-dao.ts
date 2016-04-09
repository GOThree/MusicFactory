/// <reference path="../../../../typings/main.d.ts" />

import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';
import accountSchema from '../model/account-model';

let passportLocalMongoose = require('passport-local-mongoose');

// TODO: add validations
accountSchema.static('create', (email:string, password:string):Promise<any> => {
    return new Promise<any>((resolve:Function, reject:Function) => {
        Account.register(
             new Account({email:email}), password,
                (err, user) => {
                    err ? reject(err)
                    : resolve(user);
                });
        });
});

accountSchema.static('setPasswordReset', (id:string, passwordResetToken: string, passwordResetTokenExpirationDate: Date) => {
    return new Promise<any>((resolve:Function, reject:Function) => {
        Account.findByIdAndUpdate(id, { $set:
                {
                    passwordResetToken: passwordResetToken,
                    passwordResetTokenExpirationDate: passwordResetTokenExpirationDate,
                    passwordResetRequestedOn: new Date()
                }
            },
            (err, user) => {
                err ? reject (err)
                : resolve(user);
            });
    });
});

accountSchema.static('getResetPasswordUser', (id:string, passwordResetToken:string, passwordResetTokenExpirationDate: Date) => {
    return new Promise<any>((resolve:Function, reject:Function) => {
        Account.findOne({
            _id: id,
            passwordResetToken: passwordResetToken,
            passwordResetTokenExpirationDate : { $gte: passwordResetTokenExpirationDate}
        })
        .exec((err, user) => {
            err ? reject(err) :
                resolve(user);
        });
    });
});

accountSchema.static('getUserByEmail', (username:string) => {
    return new Promise<any>((resolve:Function, reject:Function) => {
        // the username field is set to `email`
        // so we should search for username by `email`
        // the mongoose option is to save the username .toLowerCase()
        Account.findOne({email: username.toLowerCase()}, (err, user) => {
            err ? reject ( err )
            : resolve(user);
        });
    });
});

accountSchema.plugin(passportLocalMongoose, {
    digestAlgorithm: 'sha512',
    usernameField: 'email',
    usernameQueryFields : ['email'],
    usernameLowerCase: true
});

let Account:any = mongoose.model('Account', accountSchema);

export default Account;
