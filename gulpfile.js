let gulp = require('gulp'),
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



// ==============  PUG  ============== 
// Use packages: gulp-pug, del, 
	gulp.task('pug',function(){
		return gulp.src('app/pug/*.pug')
				.pipe(pug({
					pretty: true
				}))
				.pipe(gulp.dest('app/'));
	});
	// Delete Clone Pug Template On the Fly
	gulp.task('delClone', function(){
		del('app/cloneThisForNewPage.html');
	});
	// Clear custom Pug files
	gulp.task('clearPugDir', function(){
		del(['app/pug/*.pug','app/pug/blocks/**/*.pug', '!app/pug/templates']);
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
		del(['build/*','app/css/*.css','app/vendor/**/*','app/fonts/**/*','app/js/**/*','app/sass/**/*','!app/sass/mixins','!app/sass/reset.sass','app/pug/*.pug','app/pug/blocks/**/*.pug','!app/pug/templates','app/*.html','app/images/**/*'],{dryRun: false}).then(paths => {
			console.log('DELETED:\n', paths.join('\n'));
		});;
	});

// ==============  LIVE RELOAD (BROWSER SYNC)  ============== 
// Use packages: gulp-sass, gulp-postcss, postcss-sorting, gulp-autoprefixer, browser-sync, del, gulp-pug
	gulp.task('fly',function(){
		browserSync.init({
					server: {
						baseDir: 'app'
					}}
			);
		gulp.watch('app/pug/**/*.pug',['pug', 'delClone']);
		gulp.watch("app/sass/**/*.sass", ['sass']);
		gulp.watch('app/*.html').on('change', browserSync.reload);
		gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
		gulp.watch('app/img/**/*').on('change', browserSync.reload);
		gulp.watch('app/font/**/*').on('change', browserSync.reload);

	});


// ==============  BUILD PROJECT  ============== 
// Use packages: gulp-imagemin
	gulp.task('build' ,function(){
		gulp.src('bower_components/html5shiv/dist/html5shiv.js').pipe(gulp.dest('build/vendor/html5shiv/'));
		gulp.src('app/*.html').pipe(gulp.dest('build/'));
		gulp.src('app/css/**/*.css').pipe(gulp.dest('build/css/'));
		gulp.src('app/js/**/*.js').pipe(gulp.dest('build/js/'));
		gulp.src('app/images/**/*')
			.pipe(minIMG({
				interlaced: true,
				progressive: true,
				optimizationLevel: 5,
				svgoPlugins: [{removeViewBox: true}]}))
			.pipe(gulp.dest('build/images/'));
		gulp.src('app/fonts/**/*').pipe(gulp.dest('build/fonts/'));
		gulp.src('app/vendor/**/*').pipe(gulp.dest('build/vendor/'));
	});

 


