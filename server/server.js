const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const models = join(__dirname, 'models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Account = require('./models/account');
const routes = require('./routes');
const bodyParser = require('body-parser');
const jwtConfig = require('./config/passport/jwt')

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)));

const port = process.env.PORT || 3000;
const app = express();

app.use(passport.initialize());

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// jwt token authentication
jwtConfig.jwtFromRequest = ExtractJwt.fromAuthHeader();
passport.use(new JwtStrategy(jwtConfig, function(jwt_payload, done) {
    
    // get user ID
    var userId = jwt_payload.user._id;
    
    // find the user by ID
    Account.findById(userId, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

app.use('/', routes);

connect()
  .on('error', console.log)
  .on('disconnected', onDisconnected)
  .once('open', listen);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.db, options).connection;
}

function onDisconnected() {
    console.log('Disconnected from MongoDB')
}

module.exports = app;