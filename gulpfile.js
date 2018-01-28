'use strict';
const gulp = require('gulp');

const sass = require('gulp-sass');
const stylus = require('gulp-stylus');

const pug = require('gulp-pug');
var gulpPugBeautify = require('gulp-pug-beautify');

const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

const typographic = require('typographic');
const nib = require('nib');
const rupture = require('rupture');

var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

var del = require('del');

var runSequence = require('run-sequence');

const reload = browserSync.reload;

// Compile sass files to css
gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.sass')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browser: ['last 15 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('./app/css'))
      .pipe(browserSync.reload({stream:true}))
});

// Compile stylus files to css
gulp.task('stylus', function () {
  return gulp.src('./app/stylus/**/*.styl')
      .pipe(stylus({
        use: [typographic(), nib(), rupture()]
      }))
      .pipe(autoprefixer({
        browser: ['last 15 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('./app/css'))
      .pipe(browserSync.reload({stream:true}))
});

// Compile pug files to html
gulp.task('pug', () =>{
  return gulp.src('./app/pug/*.pug')
    .pipe(pug({ 
      pretty: true
    }))
    .pipe(gulp.dest('./app'))
});

// Optimize CSS and JS file
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Optimize images file
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// Delete dist folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

// Clear cache system
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
})

// Beautify the pug file
gulp.task('beauty-pug', function () {
  return gulp.src('./app/pug/**/*.pug')
    .pipe(gulpPugBeautify({ omit_empty: true }))
    .pipe(gulp.dest('dist'));
});

// The working directory
gulp.task('browser-sync', ['sass', 'stylus', 'pug'] ,function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

// Watch files comiling
gulp.task('watch', function () {
  gulp.watch('./app/sass/**/*.sass', ['sass']);
  gulp.watch('./app/stylus/**/*.styl', ['stylus']);
  gulp.watch('./app/pug/**/*.pug', ['pug']);
  gulp.watch('./app/*.html').on('change', reload);
  gulp.watch('./app/js/*.js').on('change', reload)
});

// 
gulp.task('default', ['watch', 'browser-sync']);

// Export products, includes: css, js, html, images
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['useref', 'images'],
    callback
  )
})