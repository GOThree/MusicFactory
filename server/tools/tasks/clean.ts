import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as del from 'del';

import {DIST_DIR} from '../tools.config';

export = function clean(gulp, plugins, option) {

  return function(done) {
  	del(DIST_DIR).then((paths) => {
	    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
	    done();
  	});
  };

};