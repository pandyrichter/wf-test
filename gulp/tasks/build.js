var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    cleanCss = require('gulp-clean-css');
cssnano = require('gulp-cssnano'),
    browserSync = require('browser-sync').create();

gulp.task('previewDist', function () {
    browserSync.init({
        server: {
            baseDir: "docs"
        },
        notify: false
    });
});


gulp.task('deleteDistFolder', ['icons'], function () {
    return del("./docs");
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function () {
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ]

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function () {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function () {
    return gulp.src("./app/index.html")
        .pipe(usemin({
            css: [rev()],
            html: [htmlmin({
                collapseWhitespace: true
            })],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), 'concat']
        }))
        .pipe(gulp.dest("./docs"));
});



gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);