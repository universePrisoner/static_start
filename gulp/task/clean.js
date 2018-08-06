module.exports = function() {
	$.gulp.task('clean', function () {
	    return $.gulp.src($.path.build.base+'*', {read: false})
	        .pipe($.clean());
	});
}