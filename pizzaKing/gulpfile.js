let gulp = require('gulp'),
    inline = require('gulp-inline'),
    entityconvert = require('gulp-entity-convert'),
    htmlmin = require('gulp-htmlmin'),
    zip = require('gulp-zip'),
    change = require('gulp-change'),
    gulpSequence = require('gulp-sequence'),
    clean = require('gulp-clean');


const config = {
    imgRegExpr: /src=".*"\W+data-replace-url="(.*)"/gi,
    cssBackgroundImageRegExpr: /background-image:\W*url\((?:'|").*(?:'|")\);\W*\/\*([0-9]*x[0-9]*)\*\//gi,
    fontPathUrlRegExpr: /\((?:'|")\.\.\/(images|fonts)/gi,
    sellFolder: './sell',
    previewFolder: './preview',
    srcFolder: './src',
    screensFolder: './screens'
};


//Make build
function changePlaceholdersInHTML(content) {
    return content.replace(config.imgRegExpr, function(match, wh) {
        return `src="http://via.placeholder.com/${wh}"`;
    });
}

function changePlaceholdersInCSS(content) {
    return content.replace(config.cssBackgroundImageRegExpr, function(match, wh) {
        return `background-image: url('http://via.placeholder.com/${wh}');`;
    });
}

function changePathImagesFontsInHTML(content) {
    return content.replace(config.fontPathUrlRegExpr, function(match, folder) {
        return `('${folder}`;
    });
}

gulp.task('replace:html:placeholders', function() {
    return gulp.src(`${config.sellFolder}/template/index.html`)
        .pipe(change(changePlaceholdersInHTML))
        .pipe(gulp.dest(`${config.sellFolder}/template`))
});

gulp.task('replace:css:placeholders', function() {
    return gulp.src(`${config.sellFolder}/template/**/*.css`)
    .pipe(change(changePlaceholdersInCSS))
    .pipe(gulp.dest(`${config.sellFolder}/template`))
});

gulp.task('replace:path:preview', function() {
    return gulp.src(`${config.previewFolder}/index.html`)
    .pipe(change(changePathImagesFontsInHTML))
    .pipe(gulp.dest(config.previewFolder))
});

gulp.task('del:build', function(cb) {
    return gulp.src(['sell', 'preview', 'archive.zip', 'screens.zip'], {read: false})
        .pipe(clean());
});

gulp.task('copy:preview', function() {
    return gulp.src('src/template/**/*').pipe(gulp.dest('./preview'));
});

gulp.task('uglify:html', function() {
    return gulp.src(`${config.previewFolder}/**/*.html`)
        .pipe(inline())
        .pipe(entityconvert({ type: 'html' }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(config.previewFolder));
});

gulp.task('copy:sell', function() {
    return gulp.src(`${config.srcFolder}/**/*`).pipe(gulp.dest(config.sellFolder));
});

gulp.task('zip:build', function() {
    gulp.src(`${config.sellFolder}/**/*`)
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('./'));

    return gulp.src(`${config.screensFolder}/**/*`)
        .pipe(zip('screens.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('replace:placeholders', gulpSequence('replace:html:placeholders', 'replace:css:placeholders'));
gulp.task('sell', gulpSequence('copy:sell', 'replace:placeholders'));

gulp.task('build', gulpSequence('del:build', 'sell', 'preview', 'zip:build'));

gulp.task('uglify:preview', gulpSequence('uglify:html', 'replace:path:preview'));
gulp.task('preview', gulpSequence('copy:preview', 'uglify:preview'));

