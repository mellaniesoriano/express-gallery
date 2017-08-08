/* jshint esversion: 6 */
const gulp = require("gulp");
const sass = require("gulp-sass");

gulp.task('styles', function() {
    gulp.src('scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('default',function() {
    gulp.watch('scss/styles.scss',['styles']);
});