const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const models = join(__dirname, 'models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Account = require('./models/account');
const routes = require('./routes');
const bodyParser = require('body-parser');
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