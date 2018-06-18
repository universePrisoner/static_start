let gulp = require('gulp'),
	sassGlobe = require('gulp-sass-glob'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	del = require('del'),
	postcss = require('gulp-postcss'),
	sorting = require('postcss-sorting'),
	pug = require('gulp-pug'),
	minIMG = require('gulp-imagemin');

// ==============  SASS  ============== 
gulp.task('sass',function(){	
	return gulp.src('src/blocks/sass/**/*.sass')
			.pipe(sassGlobe())
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
			.pipe(postcss(
				[sorting({
					"properties-order": "alphabetical"
				})]
			))
			.pipe(gulp.dest('src/static/css'))
			.pipe(browserSync.stream());
});



// ==============  PUG  ============== 
	gulp.task('pug',function(){
		return gulp.src('src/blocks/pug/**/*.pug')
				.pipe(pug({
					pretty: true
				}))
				.pipe(gulp.dest('src/static/'));
	});

// ==============  DELETE  ============== 
	// -------------- clear build directory --------------
	gulp.task('del',function(){
		del('build/*', {dryRun: true}).then(paths => {
			console.log('DELETED:\n', paths.join('\n'));
		});
	});

// ==============  LIVE RELOAD (BROWSER SYNC)  ============== 
	gulp.task('fly',function(){
		browserSync.init({
					server: {
						baseDir: 'src/static'
					}}
			);
		gulp.watch('src/blocks/**/*.pug',['pug']);
		gulp.watch("src/blocks/sass/**/*.sass", ['sass']);
		gulp.watch('src/static/*.html').on('change', browserSync.reload);
		gulp.watch('src/static/js/**/*.js').on('change', browserSync.reload);
		gulp.watch('src/static/img/**/*').on('change', browserSync.reload);
		gulp.watch('src/static/fonts/**/*').on('change', browserSync.reload);

	});


// ==============  BUILD PROJECT  ============== 
	gulp.task('build' ,function(){
		gulp.src('src/static/*.html').pipe(gulp.dest('build/'));
		gulp.src('src/static/css/**/*.css').pipe(gulp.dest('build/css/'));
		gulp.src('src/static/js/**/*.js').pipe(gulp.dest('build/js/'));
		gulp.src('src/static/images/**/*')
			.pipe(minIMG({
				interlaced: true,
				progressive: true,
				optimizationLevel: 5,
				svgoPlugins: [{removeViewBox: true}]}))
			.pipe(gulp.dest('build/images/'));
		gulp.src('src/static/fonts/**/*').pipe(gulp.dest('build/fonts/'));
		gulp.src('src/static/vendor/**/*').pipe(gulp.dest('build/vendor/'));
	});

 


