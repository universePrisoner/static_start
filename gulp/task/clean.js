import { task, src } from 'gulp';
import clean from 'gulp-clean';

const cleanOptions = {
	read: false,
};


module.exports = () => {
	task('clean', () => src(`${ $.path.build.base }*`, cleanOptions).pipe(clean()));
}
