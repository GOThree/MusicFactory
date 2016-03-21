
import * as gulp from 'gulp';
import {runSequence, task} from './tools/utils';

gulp.task('clean.dev', done => task('clean', 'dev')(done));
gulp.task('build.js.dev', done => task('build.js.dev')(done));
gulp.task('tslint', done => task('tslint')(done));

// Build dev.
gulp.task('build.dev', done =>
  runSequence('clean.dev',
  			  'tslint',
              'build.js.dev',
              done));
              
gulp.task('serve.dev', done =>
  runSequence('build.dev',
              'server.start',
              done));