/* tslint:disable */

// TODO: Move this to the server export logic
// because this could be forgotten at some point
// and the tests will operate(including 
// droping) the real database
process.env.NODE_ENV = 'test';

import server from '../../server';
import Account from '../../components/authentication/dao/authentication-dao';

var chai = require('chai');
var chaiHttp = require('chai-http');

var should = chai.should();
chai.use(chaiHttp);

describe('Component Authentication Registering User', () => {
    
    beforeEach(function(done){
        Account.collection.drop();
        done();
    });
    
    afterEach(function(done){
        Account.collection.drop();
        done();
    });
    
    it('should register user successfully', (done) => {
        var request = {email: 'vlado@gothree.com', password: 'test12345'}
        chai.request(server)
            .post('/register')
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                done();
        });
    });
       
    it('should register and login user successfully', (done) => {
        var request = {email: 'vlado@gothree.com', password: 'test12345'}
        chai.request(server)
            .post('/register')
            .send(request)
            .end((err, res) => {
                chai.request(server)
                    .post('/login')
                    .send(request)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
        });
    });    
});
