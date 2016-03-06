var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// TODO: validations
// logging created date, modified date, etc.
var Account = new Schema({
    fullName: String,
    last: Date
});


Account.plugin(passportLocalMongoose, {
    digestAlgorithm: 'sha512'
});

module.exports = mongoose.model('Account', Account);