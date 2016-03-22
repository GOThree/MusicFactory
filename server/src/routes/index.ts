import {TodoRoutes} from '../components/todo/routes/todo-routes';
import {AuthenticationRoutes} from '../components/authentication/routes/authentication-routes';
export class Routes {
  static init(app: any, router: any) {
    TodoRoutes.init(router);
    AuthenticationRoutes.init(router);

    app.use('/', router);
  }
}
