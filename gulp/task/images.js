const gulp     = require('gulp');
const minImage = require('gulp-imagemin');

const minifyImages = () => {
	gulp.minImage({
		interlaced       : true,
		progressive      : true,
		optimizationLevel: 5,
		svgoPlugins      : [{ removeViewBox: true }]
	});
}

module.exports = minifyImages;