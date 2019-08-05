import { task, src, dest, parallel } from 'gulp';
import minImages from 'gulp-imagemin';

const imageMinOptions = {
	interlaced       : true,
	progressive      : true,
	optimizationLevel: 5,
	svgoPlugins      : [{ removeViewBox: true }]
};


const build = () => {
	task('build', () => {
		const buildSources = () => ['css', 'js', 'fonts', 'html'].map( source => {
			return () => {
				src(`${ $.path.dev[ source ] }**/*`).pipe(dest($.path.build[ source ]));
				return Promise.resolve();
			};
		});
		
		const images = () => {
			return src(`${ $.path.dev.img }**/*`).pipe(minImages(imageMinOptions)).pipe(dest($.path.build.img));
		}
		
		parallel(buildSources(), images)();
		
		return Promise.resolve();
	});
};

module.exports = build;
