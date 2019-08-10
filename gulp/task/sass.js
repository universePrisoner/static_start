import { stream }   from 'browser-sync';
import { onError }  from 'gulp-notify';
import sourcemaps   from 'gulp-sourcemaps';

import {
	gulp,
	dest,
	src,
	task,
	parallel,
	series
} from 'gulp';

const sassGlobe    = require('gulp-sass-glob');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync');
const postcss      = require('gulp-postcss');
const sorting      = require('postcss-sorting');


const autoPrefixerConfig = {
	browsers : ['last 5 versions'],
	cascade  : false,
	flexbox  : false,
	grid     : false
}

const sortingConfig = {
	"properties-order": "alphabetical"
};

const postCssPlugs = [
	sorting(sortingConfig)
];

const scss = () => {
	task('scss', () => {
		return src(`${$.path.dev.scss}**/*.scss`)
				.pipe(sassGlobe())
				.pipe(sourcemaps.init())
				.pipe(sass())
				.on('error',onError(error => {
					console.log(error);
					return {
						title: 'Sass',
						message: 'Some gone wrong with your styles'
					}
				}))
				.pipe(autoprefixer(autoPrefixerConfig))
				.pipe(postcss(postCssPlugs))
				.pipe(sourcemaps.write('./maps'))
				.pipe(dest($.path.dev.css))
				.pipe(browserSync.stream());
	})
}

module.exports = scss ;
