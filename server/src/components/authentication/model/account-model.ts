// var mongoose = require('mongoose');
import * as mongoose from 'mongoose';

// TODO: validations
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
    }}
};

export default new mongoose.Schema(_account);

