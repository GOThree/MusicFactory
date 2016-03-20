/// <reference path="../typings/main.d.ts" />

var PORT = process.env.PORT || 3333;

import * as express from 'express';
import * as os from 'os';
import * as cors from 'cors';
import {RoutesConfig} from './config/routes.conf';
import {DBConfig} from './config/db';
import {Routes} from './routes/index';

const app = express();
/* tslint:disable */
const server = app.listen(PORT);
/* tslint:enable */

app.use(cors());
RoutesConfig.init(app, express);
DBConfig.init();
Routes.init(app, express.Router());

console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
console.log(`enviroment: ${process.env.NODE_ENV}`);
