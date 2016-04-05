import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import {AuthenticationRoutes} from '../components/authentication/routes/authentication-routes';
import {TodoRoutes} from '../components/todo/routes/todo-routes';
import * as passport from 'passport';
import * as express from 'express';

export class RoutesConfig {
    static init(application:any):void {
        let _root = process.cwd();
        let router = express.Router();
        let authenticatedRouter = express.Router();
        authenticatedRouter.use(passport.authenticate('jwt', { session: false}));

        application.use(express.static(_root));
        application.use(bodyParser.json());
        application.use(bodyParser.urlencoded({
            extended: true
        }));
        application.use(helmet());

        AuthenticationRoutes.init(router);
        TodoRoutes.init(authenticatedRouter);

        application.use('/', router);
        application.use('/api', authenticatedRouter);
    }
}
