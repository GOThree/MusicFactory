/// <reference path="typings/main.d.ts" />

import * as gulp from 'gulp';
import {runSequence, task} from './tools/utils';

gulp.task('clean', done => task('clean')(done));