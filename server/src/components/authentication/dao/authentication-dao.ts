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

accountSchema.static('setValidatedToken', (id:string, validatedToken: boolean) => {
    return new Promise<any>((resolve:Function, reject:Function) => {
        Account.findByIdAndUpdate(id, { $set: { validatedToken: validatedToken }},
            (err, user) => {
                err ? reject (err)
                : resolve(user);
            });
    });
});

accountSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    digestAlgorithm: 'sha512'
});

let Account:any = mongoose.model('Account', accountSchema);

export default Account;
