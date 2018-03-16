let gulp = require('gulp')
	,sass = require('gulp-sass')
	,autoprefixer = require('gulp-autoprefixer')
	,browserSync = require('browser-sync')
	,del = require('del')
	,postcss = require('gulp-postcss')
	,sorting = require('postcss-sorting')
	,pug = require('gulp-pug');


// SASS
gulp.task('sass',function(){
	return gulp.src('app/sass/**/*.sass')
			.pipe(sass())
			.pipe(postcss(
				[sorting({
					"properties-order": "alphabetical"
				})]
			))
			.pipe(autoprefixer())
			.pipe(gulp.dest('app/css'))
			.pipe(browserSync.stream());
});



// Pug 
gulp.task('pug',function(){
	return gulp.src('pug/*.pug')
			.pipe(pug({
				pretty: true
			}))
			.pipe(gulp.dest('app/'));
});

// Reload browser when any of files are changing
gulp.task('fly',function(){
	// Run server
	browserSync.init({
				server: {
					baseDir: 'app'
				}}
		);

	
	// Auto reloading browser page
	gulp.watch('pug/**/*.pug',['pug']);
	gulp.watch("app/sass/**/*.sass", ['sass']);
	gulp.watch('app/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
	gulp.watch('app/img/**/*').on('change', browserSync.reload);
	gulp.watch('app/font/**/*').on('change', browserSync.reload);
});


// Build Function
gulp.task('build' ,function(){
	gulp.src('app/*.html').pipe(gulp.dest('build/'));
	gulp.src('app/css/**/*.css').pipe(gulp.dest('build/css/'));
	gulp.src('app/js/**/*.js').pipe(gulp.dest('build/js/'));
	gulp.src('app/images/**/*').pipe(gulp.dest('build/images/'));
	gulp.src('app/fonts/**/*').pipe(gulp.dest('build/fonts/'));
	gulp.src('app/vendor/**/*').pipe(gulp.dest('build/vendor/'));
});

 
// Delete files inside dist folder
gulp.task('del',function(){
	del.sync('build/*');
});


// Delete files inside dist and app folders
gulp.task('destroy',function(){
	// Delete all files of Build folder
	del.sync('build/*');

	// Delete files from App's folders
	del.sync('app/css/**/*');
	del.sync('app/vendor/**/*');
	del.sync('app/fonts/**/*');
	del.sync('app/js/**/*');
	del.sync('app/images/**/*');

	del.sync('app/sass/*.sass');

	// Delete files from Pug folder
	del.sync('pug/*.pug');
});