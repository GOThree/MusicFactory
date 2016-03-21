import {APP_DEST} from '../tools.config';
import {spawn} from 'child_process';

export = function buildJSDev(gulp, plugins) {
  return function () {
    // exec('node '+APP_DEST+'/server.js', function (err, stdout, stderr) {
    //     console.log(stdout);
    //     console.log(stderr);
    // });
    var node = spawn('node', [APP_DEST + '/server.js'], {stdio: 'inherit'});
    node.on('close', function (code) {
        if (code === 8) {
        gulp.log('Error detected, waiting for changes...');
        }
    });
  };
};
