/// <reference path="../typings/main.d.ts" />

import {TodoRoutes} from '../api/todo/routes/todo-routes';

export class Routes {
  static init(app:any, router:any){
    TodoRoutes.init(router);

    app.use('/', router);
  }
}
