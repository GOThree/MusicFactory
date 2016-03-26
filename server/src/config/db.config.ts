import * as mongoose from 'mongoose';
import {ENV_VARS} from './env.config';

export class DBConfig {
    static init():void {
      const URL = ENV_VARS[process.env.NODE_ENV || 'development'].db;

      mongoose.connect(URL);
      mongoose.connection.on('error', console.error.bind(console, 'An error ocurred with the DB connection: '));
    }
};
