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
// Use packages: gulp-sass, gulp-postcss, postcss-sorting, gulp-autoprefixer, browser-sync
gulp.task('sass',function(){
	return gulp.src('src/sass/**/*.sass')
			.pipe(sassGlobe())
			.pipe(sass())
			.pipe(postcss(
				[sorting({
					"properties-order": "alphabetical"
				})]
			))
			.pipe(autoprefixer())
			.pipe(gulp.dest('src/css'))
			.pipe(browserSync.stream());
});



// ==============  PUG  ============== 
// Use packages: gulp-pug, del, 
	gulp.task('pug',function(){
		return gulp.src('src/pug/*.pug')
				.pipe(pug({
					pretty: true
				}))
				.pipe(gulp.dest('src/'));
	});
	// Delete Clone Pug Template On the Fly
	gulp.task('delClone', function(){
		del('src/cloneThisForNewPage.html');
	});
	// Clear custom Pug files
	gulp.task('clearPugDir', function(){
		del(['src/pug/*.pug','src/pug/blocks/**/*.pug', '!src/pug/templates']);
	});

// ==============  DELETE  ============== 
// Use packages: del
	// -------------- clear build directory --------------
	gulp.task('del',function(){
		del('build/*', {dryRun: true}).then(paths => {
			console.log('DELETED:\n', paths.join('\n'));
		});
	});

	// -------------- drop project architecture to default stat
	gulp.task('destroy',function(){
		del(['build/*','src/css/*.css','src/vendor/**/*','src/fonts/**/*','src/js/**/*','src/sass/**/*','!src/sass/mixins','!src/sass/reset.sass','src/pug/*.pug','src/pug/blocks/**/*.pug','!src/pug/templates','src/*.html','src/images/**/*'],{dryRun: false}).then(paths => {
			console.log('DELETED:\n', paths.join('\n'));
		});;
	});

// ==============  LIVE RELOAD (BROWSER SYNC)  ============== 
// Use packages: gulp-sass, gulp-postcss, postcss-sorting, gulp-autoprefixer, browser-sync, del, gulp-pug
	gulp.task('fly',function(){
		browserSync.init({
					server: {
						baseDir: 'src'
					}}
			);
		gulp.watch('src/pug/**/*.pug',['pug', 'delClone']);
		gulp.watch("src/sass/**/*.sass", ['sass']);
		gulp.watch('src/*.html').on('change', browserSync.reload);
		gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
		gulp.watch('src/img/**/*').on('change', browserSync.reload);
		gulp.watch('src/fonts/**/*').on('change', browserSync.reload);

	});


// ==============  BUILD PROJECT  ============== 
// Use packages: gulp-imagemin
	gulp.task('build' ,function(){
		gulp.src('src/*.html').pipe(gulp.dest('build/'));
		gulp.src('src/css/**/*.css').pipe(gulp.dest('build/css/'));
		gulp.src('src/js/**/*.js').pipe(gulp.dest('build/js/'));
		gulp.src('src/images/**/*')
			.pipe(minIMG({
				interlaced: true,
				progressive: true,
				optimizationLevel: 5,
				svgoPlugins: [{removeViewBox: true}]}))
			.pipe(gulp.dest('build/images/'));
		gulp.src('src/fonts/**/*').pipe(gulp.dest('build/fonts/'));
		gulp.src('src/vendor/**/*').pipe(gulp.dest('build/vendor/'));
	});

 


