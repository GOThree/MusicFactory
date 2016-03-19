import {join} from 'path';
import {APP_SRC, APP_DEST} from '../tools.config';
import {tsProjectFn} from '../utils';

export = function buildJSDev(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
      'typings/main.d.ts',
      join(APP_SRC, '**/*.ts'),
    ];
    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(APP_DEST));
  };
};