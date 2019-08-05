module.exports = function(){
	$.gulp.task('sass',function(){	
		return $.gulp.src($.path.dev.sass + '**/*.scss')
				.pipe($.sassGlobe())
				.pipe($.sourcemaps.init())
				.pipe($.sass())
				.on('error',$.notify.onError(function (error) {
					return {
						title: 'Sass',
						message: error.message
					}
				}))
				.pipe($.autoprefixer({browsers: ['last 5 versions'], cascade: false}))
				.pipe($.postcss(
					[$.sorting({
						"properties-order": "alphabetical"
					})]
				))

				.pipe($.sourcemaps.write('./maps'))
				.pipe($.gulp.dest($.path.dev.css))
				.pipe($.browserSync.stream());
	});
}
