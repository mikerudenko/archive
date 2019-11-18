'use strict';

const fs = require('fs');
const gulp = require('gulp');
const GulpSSH = require('gulp-ssh');
const zip = require('gulp-zip');

let config = {
    host: '128.199.32.236',
    port: 22,
    username: 'root',
    privateKey: fs.readFileSync('/Users/mikerudenko/.ssh/id_rsa')
};

let gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
});

// 'gitbook build',
// 'mv _book build/'

gulp.task('deploy', function() {
    return gulpSSH
        .shell([
            'cd /var/www/envato-test',
            'git pull',
            'npm install',
            'npm run build',
        ], {filePath: 'shell.log'})
        .pipe(gulp.dest('logs'))
});

gulp.task('zip', function() {
    return gulp.src([
        './config/**/*',
        './docs/**/*',
        './public/**/*',
        './scripts/**/*',
        './src/**/*',
        '.babelrc',
        'FOREWORD.md',
        'package.json',
        'package-lock.json',
        'README.md',
        'SUMMARY.md',
        'yarn.lock'
    ], {
        base: './'
    })
        .pipe(zip('main.zip'))
        .pipe(gulp.dest('./sell-materials/'));
});
