var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('build', function () {
  gulp.src([
    './public/javascripts/angularApp.js',
    './public/javascripts/config.js',
    './public/javascripts/services/*.js',
    './public/javascripts/controllers/*Ctrl.js'
  ]).pipe(concat('main.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});