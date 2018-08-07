module.exports = function(){
	$.gulp.task('do-fonts',function(){
		let woff2 = $.gulp.src('./src/fonts/**/*.ttf')
			.pipe($.ttf2woff2())
			.pipe($.gulp.dest('./src/fonts/'));	
		let woff = $.gulp.src('./src/fonts/**/*.ttf')
			.pipe($.ttf2woff())
			.pipe($.gulp.dest('./src/fonts/'));
		let delTtf = $.gulp.src('./src/fonts/**/*.ttf')
			.pipe($.clean());
		return [woff2,woff,delTtf];
	});
	
}