module.exports = function(){
	$.gulp.task('default',function(){
		$.browserSync.init({
					server: {
						baseDir: $.path.dev.base
					}}
			);
		$.gulp.watch($.path.dev.sass + "**/*.scss", ['sass']);
		$.gulp.watch($.path.dev.html + '*.html').on('change', $.browserSync.reload);
		$.gulp.watch($.path.dev.js + '**/*.js').on('change', $.browserSync.reload);
		$.gulp.watch($.path.dev.img + '**/*').on('change', $.browserSync.reload);
		$.gulp.watch($.path.dev.fonts + '**/*').on('change', $.browserSync.reload);

	});
}