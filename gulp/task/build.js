import gulp from 'gulp';
import { minifyImages } from './images';

const build = () => {
	gulp.task('build', () => {
		gulp.src($.path.dev.css + '**/*').pipe(gulp.dest($.path.build.css));
		gulp.src($.path.dev.js + '**/*').pipe(gulp.dest($.path.build.js));
		gulp.src($.path.dev.js + '**/*').pipe(gulp.dest($.path.build.js));
		gulp.src($.path.dev.img + '**/*').pipe(minifyImages()).pipe(gulp.dest($.path.build.img));
		gulp.src($.path.dev.fonts + '**/*').pipe(gulp.dest($.path.build.fonts ));
	});
};

module.exports = build;