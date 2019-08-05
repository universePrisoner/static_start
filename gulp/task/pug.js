module.exports = function () {
	$.gulp.task('pug',function () {
		return $.gulp.src($.path.dev.pug + 'pages/*.pug')
		.pipe($.pug({
			locals: {
				// Hack to throw config file to pug
				index: JSON.parse($.fs.readFileSync('./src/pug/data/dataIndex.json', 'utf-8'))
			},
			pretty:true,
			verbose: true
		}))
		.on('error',$.notify.onError(function (error) {
			return {
				title: 'Pug',
				message: error.message
			}
		}))
		.pipe($.gulp.dest($.path.dev.base))
		.on('end',$.browserSync.reload);
	});
}
