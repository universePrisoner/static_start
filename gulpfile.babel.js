"use strict";

global.$ = {
	gulp        : require('gulp'),
	sassGlobe   : require('gulp-sass-glob'),
	sass        : require('gulp-sass'), 
	autoprefixer: require('gulp-autoprefixer'),
	browserSync : require('browser-sync'),
	clean       : require('gulp-clean'),
	postcss     : require('gulp-postcss'),
	sorting     : require('postcss-sorting'),
	minIMG      : require('gulp-imagemin'),
	notify      : require('gulp-notify'),
	spritesmith : require('gulp.spritesmith'),
	buffer      : require('vinyl-buffer'),
	del         : require('del'),
	pug         : require('gulp-pug'),
	fs          : require('fs'),
	sourcemaps  : require('gulp-sourcemaps'),
	ttf2woff2   : require('gulp-ttf2woff2'),
	ttf2woff    : require('gulp-ttf2woff'),


	path: {
		tasks: require('./gulp/config/tasks.js'),
		dev  : {
			js   : 'src/js/',
			sass : 'src/sass/',
			pug  : 'src/pug/',
			base : 'src/static/',
			html : 'src/static/',
			fonts: 'src/static/fonts/',
			img  : 'src/static/img/',
			css  : 'src/static/css/',
		},
		build: {
			base : 'build/',
			sass : 'build/sass/',
			html : 'build/',
			js   : 'build/js/',
			fonts: 'build/fonts/',
			img  : 'build/img/',
			css  : 'build/css/'
		}
	}
};


$.path.tasks.forEach(taskPath => require(taskPath)())