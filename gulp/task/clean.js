import gulp from 'gulp';
import * as clean from 'gulp-clean';

const cleanBuild = () => {
	gulp.task('clean', function () {
		return gulp
			.src($.path.build.base+'*', {read: false})
	        .pipe(clean());
	});
}

module.exports = cleanBuild;