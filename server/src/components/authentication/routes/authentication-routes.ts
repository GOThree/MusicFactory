import {AuthenticationController} from '../controller/authentication-controller';
import * as passport from 'passport';

export class AuthenticationRoutes {
    static init(router) {
        router
            .route('/register')
            .post(AuthenticationController.create);
        router
            .route('/login')
            .post(passport.authenticate('local'), AuthenticationController.login);
    }
}
