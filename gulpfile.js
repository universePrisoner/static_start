let gulp = require('gulp'),
	sassGlobe = require('gulp-sass-glob'),//import sass|scss files
	sass = require('gulp-sass'), 
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	clean = require('gulp-clean'),
	postcss = require('gulp-postcss'),
	sorting = require('postcss-sorting'),//sorting CSS properties by alphabetical order
	minIMG = require('gulp-imagemin'),
	useref = require('gulp-useref'),
	notify = require('gulp-notify');

// ==============  SASS  ============== 
gulp.task('sass',function(){	
	return gulp.src('src/sass/**/*.sass')
			.pipe(sassGlobe())
			.pipe(sass())
			.on('error',notify.onError())
			.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
			.pipe(postcss(
				[sorting({
					"properties-order": "alphabetical"
				})]
			))
			.pipe(gulp.dest('src/css'))
			.pipe(browserSync.stream());
});

// ==============  DELETE  ============== 
	// -------------- clear build directory --------------
	gulp.task('clean', function () {
    return gulp.src('build/**/*', {read: false})
        .pipe(clean());
});
// ==============  LIVE RELOAD (BROWSER SYNC)  ============== 
	gulp.task('default',function(){
		browserSync.init({
					server: {
						baseDir: 'src'
					}}
			);
		gulp.watch("src/sass/**/*.sass", ['sass']);
		gulp.watch('src/*.html').on('change', browserSync.reload);
		gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
		gulp.watch('src/img/**/*').on('change', browserSync.reload);
		gulp.watch('src/fonts/**/*').on('change', browserSync.reload);

	});
gulp.task('useref', function(){
		  return gulp.src('src/*.html')
		    .pipe(useref())
		    .pipe(gulp.dest('build/'))
		});

// ==============  BUILD PROJECT  ============== 
	gulp.task('build',['useref'] ,function(){
		
		gulp.src('src/img/**/*')
			.pipe(minIMG({
				interlaced: true,
				progressive: true,
				optimizationLevel: 5,
				svgoPlugins: [{removeViewBox: true}]}))
			.pipe(gulp.dest('build/img/'));
		gulp.src('src/fonts/**/*').pipe(gulp.dest('build/fonts/'));
	});

 


