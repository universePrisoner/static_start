"use strict";

global.$ = {
	gulp: require('gulp'),
	sassGlobe: require('gulp-sass-glob'),
	sass: require('gulp-sass'), 
	autoprefixer: require('gulp-autoprefixer'),
	browserSync: require('browser-sync'),
	clean: require('gulp-clean'),
	postcss: require('gulp-postcss'),
	sorting: require('postcss-sorting'),
	minIMG: require('gulp-imagemin'),
	useref: require('gulp-useref'),
	notify: require('gulp-notify'),
	spritesmith: require('gulp.spritesmith'),
	buffer: require('vinyl-buffer'),
	del: require('del'),
	pug: require('gulp-pug'),
	fs: require('fs'),
	sourcemaps: require('gulp-sourcemaps'),


	path: {
		tasks: require('./gulp/config/tasks.js'),
		dev: {
			base: 'src/',
			sass: 'src/sass/',
			html: 'src/',
			js: 'src/js/',
			fonts: 'src/fonts/',
			img: 'src/img/',
			css: 'src/css/',
			pug: 'src/pug/'
		},
		build: {
			base: 'build/',
			sass: 'build/sass/',
			html: 'build/',
			js: 'build/js/',
			fonts: 'build/fonts/',
			img: 'build/img/',
			css: 'build/css/'
		}
	}
};


$.path.tasks.forEach(function (taskPath) {
	require(taskPath)();
});

