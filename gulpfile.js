let gulp = require('gulp')
	,sass = require('gulp-sass')
	,autoprefixer = require('gulp-autoprefixer')
	,browserSync = require('browser-sync')
	,del = require('del')
	,postcss = require('gulp-postcss')
	,sorting = require('postcss-sorting')
	,pug = require('gulp-pug');

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
	gulp.src('app/*.html').pipe(gulp.dest('dist/'));
	gulp.src('app/css/**/*.css').pipe(gulp.dest('dist/css/'));
	gulp.src('app/js/**/*.js').pipe(gulp.dest('dist/js/'));
	gulp.src('app/img/**/*').pipe(gulp.dest('dist/images/'));
	gulp.src('app/font/**/*').pipe(gulp.dest('dist/fonts/'));
	gulp.src('app/lib/**/*').pipe(gulp.dest('dist/libs/'));
});
// Delete files inside dist folder
gulp.task('del',function(){
	del.sync('dist/*');
});
// Delete files inside dist and app folders
gulp.task('destroy',function(){
	del.sync('dist/*');
	del.sync('app/*');
});