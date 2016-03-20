import {readFileSync} from 'fs';

export const ENV                  = 'dev'; //todo fix to get it dynamically
export const DIST_DIR             = 'dist';
export const TOOLS_DIR            = 'tools';
export const TYPINGS_DIR            = 'typings';
export const VERSION              = appVersion();
export const APP_SRC              = 'src';
export const APP_DEST             = `${DIST_DIR}/${ENV}`;
export const DEV_DEST             = `${DIST_DIR}/dev`;

function appVersion(): number|string {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}
