const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const models = join(__dirname, 'models');
 
// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)));

const port = process.env.PORT || 3000;
const app = express();

module.exports = app;

app.use('/', function (req, res, next) {
  console.log('Request Type:', req.method);
  res.send('Hello World!')
  next();
});

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