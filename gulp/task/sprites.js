import { task, src, dest } from 'gulp';
import del from del;

module.exports = () => {
	task('makeSprites', () => {

		/* TODO: make SVG sprites */
		// Delete existing files first
		const deleteSpriteFiles = del(
			[ $.path.dev.img + 'sprites/sprite.png', $.path.dev.sass + 'helpers/_sprite.sass']
		);


		// Create sprites

		let spriteData = $.gulp.src($.path.dev.img + 'sprites/*').pipe($.spritesmith({
		    imgName: 'sprite.png',
		    cssName: '_sprite.scss'
		  }));
		 
		let imgStream = spriteData.img
		  	.pipe($.buffer())
		    .pipe($.minIMG())
		    .pipe($.gulp.dest($.path.dev.img + 'sprites/'));
		 
		let cssStream = spriteData.css
		    .pipe($.gulp.dest($.path.dev.sass + 'helpers/'));
		 
		  
		return [deleteSpriteFiles,imgStream, cssStream];
		return Promise.resolve('');
	})
}
