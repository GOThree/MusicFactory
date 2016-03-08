var passport = require('passport');
var Account = require('./models/account');
var express = require('express');
var router = express.Router();
var passportService = require('./services/passportService');

router.post('/register', function(req, res, next){
    Account.register(new Account({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log('error while user register', err);
        } else {
            // issue token
            var token = passportService.createToken(user);
            // return token
            res.send({jwt: token});
        }
    });
});

router.get('/',
    function(req, res) {
        res.send('Hello World!');
    }
);

router.get('/jwt_test_route', passport.authenticate('jwt', { session: false}),
    function(req, res) {
        // should not s
        res.send({userId: req.user.id});
    }
);

router.post('/login', passport.authenticate('local'), function(req, res) {  
    // issue token
    var token = passportService.createToken(req.user);
    // return token
    res.send({jwt: token});
});

router.get('/logout', function(req, res) {
  // the jwt should be deleted from the FE
  // req.logout() is not needed because the LocalStrategy 
  // is not using session
  req.logout();
  res.redirect('/');
});

router.get('/users', function(req, res) {
  Account.find({}, function(err, users) {
    res.json(users);
  });
});   

module.exports = router;