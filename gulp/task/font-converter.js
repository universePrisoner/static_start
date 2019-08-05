'use-strict';
import { series, src, dest, task } from 'gulp';
import clean from 'gulp-clean';
import { onError } from 'gulp-notify';
import ttf2woffGulp from 'gulp-ttf2woff';
import ttf2woff2Gulp from 'gulp-ttf2woff2';

const converters = {
	woff  : ttf2woffGulp,
	woff2 : ttf2woff2Gulp
}


module.exports = () => {
	task('makeFonts', function(){
		const convertTTF = done => {
			for( const converter in converters ) {
				src(`${ $.path.dev.fonts }*/*.ttf`).pipe(converters[converter]()).pipe(dest($.path.dev.fonts));
			}
			
			done();
		}
		
		const deleteTTF  = () => src(`${ $.path.dev.fonts }*/*.ttf`).pipe(clean());
		
		series(convertTTF, deleteTTF)();
		
		return Promise.resolve('');
	});

}
