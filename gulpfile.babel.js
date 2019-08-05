'use strict';
import tasks from './gulp/taskList';

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
		dev  : {
			js   : 'src/js/',
			sass : 'src/sass/',
			pug  : 'src/pug/',
			base : 'static/',
			html : 'static/',
			img  : 'static/img/',
			css  : 'static/css/',
			fonts: 'static/fonts/',
		},
		build: {
			html : 'build/',
			js   : 'build/js/',
			fonts: 'build/fonts/',
			img  : 'build/img/',
			css  : 'build/css/'
		}
	}
};


tasks.forEach(task => require(task)());
