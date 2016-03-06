var passport = require('passport');
var Account = require('./models/account');
var express = require('express');
var router = express.Router();


router.post('/register', function(req, res, next){
    Account.register(new Account({username: req.body.username}), req.body.password, function(err){
        if(err){
            console.log('error while user register', err);
        }
        console.log('user registered!');
    })
});

router.get('/', function (req, res, next) {
  console.log('Request Type:', req.method);
  res.send('Hello World!')
  next();
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('User: ' + req.user)
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/users', function(req, res) {
  Account.find({}, function(err, users) {
    res.json(users);
  });
});   

module.exports = router;