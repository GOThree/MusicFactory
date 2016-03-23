import {TodoRoutes} from '../../components/todo/routes/todo-routes';
import * as passport from 'passport';

export class AuthenticatedRoutes {
  static init(app: any, router: any) {
    router.use(passport.authenticate('jwt', { session: false}));

    TodoRoutes.init(router);
    app.use('/', router);
  }
}
