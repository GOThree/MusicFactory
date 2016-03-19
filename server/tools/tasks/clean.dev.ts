import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as del from 'del';

import {DEV_DEST} from '../tools.config';

export = function clean(gulp, plugins, option) {

  return function(done) {
  	del(DEV_DEST).then((paths) => {
	    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
	    done();
  	});
  };

};