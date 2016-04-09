// var mongoose = require('mongoose');
/// <reference path="../../../../typings/main.d.ts" />

import * as mongoose from 'mongoose';

// TODO: validations
// TODO: add password validator
// logging created date, modified date, etc.
const _account = {
    fullName: {type: String, required: false, trim: true},
    last: {type: Date},
    email: {type: String, required: true, trim: true, validate:{
        validator: (v:string) => {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(v); // Assuming email has a text attribute
        },
        message: 'Email is not in the correct format'
    }},
    passwordResetOn: {type: Date},
    // define the date of last password reset request 
    passwordResetRequestedOn: {type: Date},
    // the reset token needed for updating the password
    passwordResetToken: {type: String, select: false},
    // the date until the token is valid
    passwordResetTokenExpirationDate: {type: Date}
};

export default new mongoose.Schema(_account);

