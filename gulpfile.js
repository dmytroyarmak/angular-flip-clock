/* jshint node: true */

'use strict';

var gulp = require('gulp');
var del = require('del');
var gulpRename = require('gulp-rename');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpWrap = require('gulp-wrap');
var gulpMinifyCss = require('gulp-minify-css');
var gulpNgHtml2Js = require('gulp-ng-html2js');
var gulpPostcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var browserSync = require('browser-sync').create();

var paths = {
  CSS_SRC: 'src/css/**/*.css',
  JS_SRC: 'src/js/**/*.js',
  JS_DIST: 'dist/**/*.js',
  CSS_DIST: 'dist/**/*.css',
  FULL_JS_SRC: ['dist/angular-flip-clock.js', 'dist/angular-flip-clock.tpl.js'],
  TEMPLATES_SRC: 'src/js/**/*.html',
  DIST: 'dist/'
};

function addMinToBasename(path) {
  path.basename += ".min";
}

gulp.task('clean', function() {
  return del(paths.DIST);
});

gulp.task('copy-css', ['clean'], function() {
  return gulp.src(paths.CSS_SRC)
    .pipe(gulpPostcss([
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ]))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('minify-css', ['copy-css'], function() {
  return gulp.src(paths.CSS_DIST)
    .pipe(gulpMinifyCss())
    .pipe(gulpRename(addMinToBasename))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('copy-js', ['clean'], function() {
  return gulp.src(paths.JS_SRC)
    .pipe(gulpConcat('angular-flip-clock.js'))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('generate-templates-js', ['clean'], function() {
  return gulp.src(paths.TEMPLATES_SRC, {base: '.'})
    .pipe(gulpNgHtml2Js({
      moduleName: 'dyFlipClock',
      declareModule: false
    }))
    .pipe(gulpConcat('angular-flip-clock.tpl.js'))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('create-full-js', ['copy-js', 'generate-templates-js'], function() {
  return gulp.src(paths.FULL_JS_SRC)
    .pipe(gulpConcat('angular-flip-clock.full.js'))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('wrap-js', ['copy-js', 'generate-templates-js', 'create-full-js'], function() {
  return gulp.src(paths.JS_DIST)
    .pipe(gulpWrap('(function() {\n\'use strict\';\n<%= contents %>}());'))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('minify-js', ['wrap-js'], function() {
  return gulp.src(paths.JS_DIST)
    .pipe(gulpUglify())
    .pipe(gulpRename(addMinToBasename))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: '/example'
    });

    gulp.watch('src/**/*', ['build-and-reload']);
});

gulp.task('build-and-reload', ['build'], browserSync.reload);

gulp.task('build-css', ['copy-css', 'minify-css']);

gulp.task('build-js', ['copy-js', 'generate-templates-js', 'create-full-js', 'wrap-js', 'minify-js']);

gulp.task('build', ['build-css', 'build-js']);

gulp.task('default', ['build']);
