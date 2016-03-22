// var mongoose = require('mongoose');
import * as mongoose from 'mongoose';

// TODO: validations
// logging created date, modified date, etc.
const _account = {
    fullName: {type: String, required: false, trim: true},
    last: {type: Date}
};

export default new mongoose.Schema(_account);

