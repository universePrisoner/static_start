module.exports = function(){
	$.gulp.task('sass',function(){	
		return $.gulp.src($.path.dev.sass + '**/*.scss')
				.pipe($.sassGlobe())
				.pipe($.sass())
				.on('error',$.notify.onError())
				.pipe($.autoprefixer({browsers: ['last 5 versions'], cascade: false}))
				.pipe($.postcss(
					[$.sorting({
						"properties-order": "alphabetical"
					})]
				))
				.pipe($.gulp.dest($.path.dev.css))
				.pipe($.browserSync.stream());
	});
}