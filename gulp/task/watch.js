const gulp = require('gulp')
module.exports = function(){
	gulp.task('default',function(){
		$.browserSync.init({
					server: {
						baseDir: $.path.dev.base
					}}
			);
		gulp.watch($.path.dev.sass + "**/*.scss", gulp.parallel(['sass']), $.browserSync.reload);
		gulp.watch($.path.dev.html + '*.html').on('change', $.browserSync.reload);
		gulp.watch($.path.dev.js + '**/*.js').on('change', $.browserSync.reload);
		gulp.watch($.path.dev.img + '**/*').on('change', $.browserSync.reload);
		gulp.watch($.path.dev.fonts + '**/*').on('change', $.browserSync.reload);
		gulp.watch([$.path.dev.pug + 'pages/*.pug',$.path.dev.pug + 'blocks/**/*.pug'], gulp.parallel(['pug'])).on('change', $.browserSync.reload);
	});
}
