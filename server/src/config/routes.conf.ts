import * as bodyParser from 'body-parser';

export class RoutesConfig {
    static init(application:any, exp:any):void {
        let _root = process.cwd();

        application.use(exp.static(_root));
        application.use(bodyParser.json());
    }
}
