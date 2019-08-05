import gulp from 'gulp';

module.exports = function(){
	gulp.task('makeFonts', function(){
		const woff2 = () => {
			return gulp.task('convertWOFF2', () => {
				return gulp.src('./src/static/fonts/**/*.ttf')
					.pipe($.ttf2woff2())
					.pipe(gulp.dest('./src/static/fonts/'));	
			});
		}

		const woff = () => {
			return gulp.task('convertWOFF', () => {
				return gulp.src('./src/static/fonts/**/*.ttf')
				.pipe($.ttf2woff())
				.pipe(gulp.dest('./src/fonts/'));
			});
		}

		const deleteTTF = () => {
			return gulp.task('deleteTTF', () => {
				return gulp.src('./src/static/fonts/**/*.ttf')
				.pipe($.clean());
			});
		}
		
		return gulp.series(woff2, woff, deleteTTF, (res) => { res()});
	});
	
}