
import * as gulp from 'gulp';
import {runSequence, task} from './tools/utils';

//debugger;
gulp.task('clean', done => task('clean')(done));

//gulp.task('build', function() {
//  console.log('Gulp is running!')
//});