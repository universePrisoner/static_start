import * as gulp         from 'gulp';
import pug               from 'gulp-pug';
import { onError }       from 'gulp-notify';
import * as browserSync  from 'browser-sync';
import fs from 'fs';


const compileData = {
	index : JSON.parse(fs.readFileSync('./src/pug/data/dataIndex.json', 'utf-8'))
};


const compileOptions = {
	pretty    : true,
	verbose   : true,
	locals    : compileData,
};


const compilePug = () => {
	gulp.task('pug', () => {
		return gulp.src(`${$.path.dev.pug}pages/*.pug`)
			.pipe(pug(compileOptions))
			.on('error', onError( err => {
				console.log({
					error    : err.Error,
					code     : err.code,
					message  : err.msg,
					fileName : err.filename
				});
				
				return { title: 'PUG', message: err.code  };
			}))
			.pipe( gulp.dest($.path.dev.base) )
			.on('end', browserSync.reload );
	});
}

module.exports = compilePug;
