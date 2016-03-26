import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import {AuthenticationRoutes} from '../components/authentication/routes/authentication-routes';
import {TodoRoutes} from '../components/todo/routes/todo-routes';
import * as passport from 'passport';

export class RoutesConfig {
    static init(application:any, exp:any):void {
        let _root = process.cwd();
        let router = exp.Router();

        application.use(exp.static(_root));
        application.use(bodyParser.json());
        application.use(helmet());
        AuthenticationRoutes.init(router);
        router.use(passport.authenticate('jwt', { session: false}));
        TodoRoutes.init(router);

        application.use('/', router);
    }
}
