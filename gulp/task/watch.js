import { watch, task, parallel } from 'gulp';

const browserSyncOptions = {
	server: {
		baseDir: $.path.dev.base
	}
}

module.exports = () => {
	task('default', () => {
		$.browserSync.init(browserSyncOptions);
		
		[
			watch(`${ $.path.dev.html    }*.html`),
			watch(`${ $.path.dev.js      }**/*.js`),
			watch(`${ $.path.dev.img     }**/*`),
			watch(`${ $.path.dev.fonts   }**/*`),
			watch(`${ $.path.dev.blocks  }**/*`,      parallel(['scss', 'pug'])),
			watch(`${ $.path.dev.scss    }**/*.scss`, parallel(['scss'])),
			watch(`${ $.path.dev.pug     }**/*.pug` , parallel(['pug'])),
		].forEach(watcher => {
			watcher.on('change', $.browserSync.reload);
		});
		
		return Promise.resolve('');
	});
}
