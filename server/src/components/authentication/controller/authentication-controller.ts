import Account from '../dao/authentication-dao';
var passportService = require('../services/authentication-services');

export class AuthenticationController {
    static create(req:any, res:any):void {
        var username = req.body.username;
        var password = req.body.password;

        Account.create(username, password)
            .then(data => res.status(200).json({}))
            .catch(error => res.status(409).json('user has been already reagister'));
    }

    static login(req: any, res:any):void {
            // issue token
            var token = passportService.createToken(req.user);
            res.send({jwt: token});
            // res.send({user: req.user});
    }
}
