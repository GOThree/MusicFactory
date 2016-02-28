process.env.NODE_ENV = process.env.NODE_ENV || "development";

const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');

module.exports = {
  development: development,
  test: test,
  production: production
}[process.env.NODE_ENV || 'development'];
