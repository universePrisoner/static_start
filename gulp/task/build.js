module.exports = function () {
	$.gulp.task('useref', function(){
		  return $.gulp.src($.path.dev.html+'*.html')
		    .pipe($.useref())
		    .on('error',$.notify.onError(function (error) {
				return {
					title: 'Useref',
					message: error.message
				}
			}))
		    .pipe($.gulp.dest($.path.build.html))
		});

	$.gulp.task('build',['useref'] ,function(){
		
		$.gulp.src($.path.dev.css + '**/*').pipe($.gulp.dest($.path.build.css));
		$.gulp.src($.path.dev.js + '**/*').pipe($.gulp.dest($.path.build.js));
		$.gulp.src($.path.dev.js + '**/*').pipe($.gulp.dest($.path.build.js));

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