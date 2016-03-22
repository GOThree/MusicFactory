import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';
import accountSchema from '../model/account-model';

let passportLocalMongoose = require('passport-local-mongoose');

// TODO: add validations
accountSchema.static('create', (username:string, password:string):Promise<any> => {
    return new Promise<any>((resolve:Function, reject:Function) => {
        Account.register(
             new Account({username:username}), password,
                (err, user) => {
                    err ? reject(err)
                    : resolve(user);
                });
        });
});

accountSchema.plugin(passportLocalMongoose, {
    digestAlgorithm: 'sha512'
});

let Account:any = mongoose.model('Account', accountSchema);

export default Account;
