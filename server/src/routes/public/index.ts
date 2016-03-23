import {AuthenticationRoutes} from '../../components/authentication/routes/authentication-routes';

export class Routes {
  static init(app: any, router: any) {
    AuthenticationRoutes.init(router);

    app.use('/', router);
  }
}
