import { src, dest, task }   from 'gulp';
import pug                   from 'gulp-pug';
import { onError }           from 'gulp-notify';
import fs from 'fs';


const compileData = {
	index : JSON.parse(fs.readFileSync('./src/pug/data/index.json', 'utf-8'))
};


const compileOptions = {
	pretty    : true,
	verbose   : true,
	locals    : compileData,
};


module.exports = () => {
	task('pug', () => {
		src(`${ $.path.dev.pug }pages/*.pug`)
			.pipe(pug(compileOptions))
			.on('error', onError( err => {
				console.log(err);
				
				return { title: 'PUG', message: err.code  };
			}))
			.pipe(dest($.path.dev.base) );
		
		return Promise.resolve();
	});
}

