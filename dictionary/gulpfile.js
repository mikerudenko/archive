'use strict';

const fs = require('fs');
const gulp = require('gulp');
const GulpSSH = require('gulp-ssh');

const config = {
  host: '128.199.32.236',
  port: 22,
  username: 'root',
  privateKey: fs.readFileSync('/Users/mikerudenko/.ssh/id_rsa'),
};

const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config,
});

gulp.task('deploy', function() {
  return gulpSSH
    .shell(
      [
        'pm2 stop app',
        'cd /var/www/dictionary',
        'git pull',
        'cd api',
        'npm install',
        'cd ..',
        'cd ui',
        'npm install',
        'npm run build',
        'pm2 start app',
      ],
      { filePath: 'shell.log' },
    )
    .pipe(gulp.dest('logs'));
});
