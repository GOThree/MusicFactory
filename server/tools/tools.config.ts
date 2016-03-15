import {readFileSync} from 'fs';

export const DIST_DIR             = 'dist';
export const TOOLS_DIR            = 'tools';
export const VERSION              = appVersion();
export const APP_SRC              = 'src';

function appVersion(): number|string {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}