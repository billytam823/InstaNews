'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('default', ['uglify','scss','browser-sync']);

// (BrowserSync) proxy server
gulp.task('browser-sync', function() {
    browserSync.init({
    	open: false,
        proxy: "192.168.33.10/project2/src"
    });

    //watch tasks
    gulp.watch('./src/*.js',['uglify']);
    gulp.watch('./src/*.scss',['scss']);
    gulp.watch(['./build/**/*.*', './src/*.*']).on('change', browserSync.reload);
});


//(Uglify) the js files
gulp.task('uglify', function(){
	gulp.src('./src/*.js')// what file do wewant gulp to consume
		.pipe(uglify()) // call the uglify function on these files
		.pipe(gulp.dest('./build')) //where do we put the result	
});


//(Gulp-Sass)
gulp.task('scss', function () {
  return gulp.src('./src/*.scss')
    	.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('./build'));
});