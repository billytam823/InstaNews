'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var babel = require('gulp-babel');

gulp.task('default', ['sass','babel','browser-sync']);

// (BrowserSync) proxy server
gulp.task('browser-sync', function() {
    browserSync.init({
    	open: false,
        proxy: "192.168.33.10/project2/"
    });

    //watch tasks
    gulp.watch('./src/js/**/*.js',['babel']);
    gulp.watch('./src/css/*.scss',['sass']);
    gulp.watch(['./build/**/*.*', 'index.html']).on('change', browserSync.reload);
});


//(Uglify) the js files
gulp.task('uglify', function(){
	gulp.src('./src/js/**/*.js')// what file do we want gulp to consume
		.pipe(uglify()) // call the uglify function on these files
		.pipe(gulp.dest('./build/js')) //where do we put the result	
});

//(Babel) the js files
gulp.task('babel', () => {
    return gulp.src('./src/js/**/main.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./build/js'));
});


//(Gulp-Sass)
gulp.task('sass', function () {
  return gulp.src('./src/css/*.scss')
    	.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('./build/css'));
});