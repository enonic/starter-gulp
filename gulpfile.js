'use strict';

// Folder variables
var srcSite = 'src/main/resources/site';
var buildSite = 'build/resources/main/site';
var srcAssets = srcSite + '/assets';
var buildAssets = buildSite + '/assets';

var gulp = require('gulp');

// Sass compile
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
};

// CSS sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// Autoprefixer, adds vendor specific css
var autoprefixer = require('gulp-autoprefixer');

// HTML minification
var htmlmin = require('gulp-htmlmin');

var jshint = require('gulp-jshint');

// Webpack
var gulpWebpack = require('webpack-stream');

// Image minification
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); // $ npm i -D imagemin-pngquant


// Default task, runs all other tasks
gulp.task('build', ['sass', 'jsHint', 'webpack', 'minifyImages', 'minifyHTML']);

// Compile Sass files
// Create CSS sourcemaps
// Add vendor specific CSS
gulp.task('sass', function () {
    return gulp
        .src(srcAssets + '/css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(buildAssets + '/css/'))
        .resume();
});

// Minify PNG, JPEG, GIF and SVG images in assets folder
gulp.task('minifyImages', function () {
    return gulp
        .src(srcAssets + '/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(buildAssets + '/img'));
});

// JSHint, Helps to detect errors and potential problems in code
gulp.task('jsHint', function() {
    return gulp
        .src([srcAssets + '/js/*.js', srcAssets + '/js/plugins/!*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Minify the HTML of all components
gulp.task('minifyHTML', function() {
    return gulp.src(srcSite + '/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            keepClosingSlash: true
        }))
        .pipe(gulp.dest(buildSite))
});

// Runs webpack module bundler
gulp.task('webpack', function() {
    return gulp
        .src(srcAssets + '/js/main.js')
        .pipe(gulpWebpack(require('./webpack.config.js')))
        .pipe(gulp.dest(buildAssets + '/js'));
});