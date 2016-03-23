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

accountSchema.static('setValidToken', (id:string, validToken: boolean) => {
    return new Promise<any>((resolve:Function, reject:Function) => {
        Account.findByIdAndUpdate(id, { $set: { validToken: validToken }},
            (err, user) => {
                err ? reject (err)
                : resolve(user);
            });
    });
});

accountSchema.static('createResetPasswordToken', (username:string) => {
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
    usernameField: 'email',
    digestAlgorithm: 'sha512',
    usernameLowerCase: true
});

let Account:any = mongoose.model('Account', accountSchema);

export default Account;
