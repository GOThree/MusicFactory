import {AuthenticationController} from '../controller/authentication-controller';
import * as passport from 'passport';

export class AuthenticationRoutes {
    static init(router) {
        router
            .route('/register')
            .post(AuthenticationController.createValidation, AuthenticationController.create);
        router
            .route('/login')
            .post(passport.authenticate('local'), AuthenticationController.login);
        router
            .route('/reset')
            .post(AuthenticationController.requestPasswordResetValidation, AuthenticationController.requestPasswordReset);
        router
            .route('/changepassword')
            .post(AuthenticationController.changePassword);
    }
}
