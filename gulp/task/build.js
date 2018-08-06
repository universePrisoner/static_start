module.exports = function () {
	$.gulp.task('useref', function(){
		  return $.gulp.src($.path.dev.html+'*.html')
		    .pipe($.useref())
		    .pipe($.gulp.dest($.path.build.html))
		});

	$.gulp.task('build',['useref'] ,function(){
		
		$.gulp.src($.path.dev.img + '**/*')
			.pipe($.minIMG({
				interlaced: true,
				progressive: true,
				optimizationLevel: 5,
				svgoPlugins: [{removeViewBox: true}]}))
			.pipe($.gulp.dest($.path.build.img));
		$.gulp.src($.path.dev.fonts + '**/*').pipe($.gulp.dest($.path.build.fonts ));
	});
}