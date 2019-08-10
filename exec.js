const program = require('commander');
const fs      = require('fs');
const exec    = require('child_process').exec;


program
	.command('createBlock')
	.description('Create pug and styles file and include styles file into project. Pug file not included.')
	.option('--n <val>, --name <val>', 'New block name')
	.action(o => {
		if ( ! o.n ) {
			console.log('--------\nName for the block did not specified\n--------');
			return;
		}
		
		createPugBlock(o.n);
		createStylesBlock(o.n);
	});

program
	.command('deleteBlock')
	.description('Delete block files and show where this block has been included in this project')
	.option('--n <val>', 'Block name')
	.action( o => {
		if ( ! o.n ) {
			console.log('Block name to delete did not specified');
			return;
		}
		
		const pathToBlockFiles    = `./src/blocks/${ o.n }`;
		
		
		if ( ! fs.existsSync(pathToBlockFiles) ) return;
		
		fs.unlink(`${pathToBlockFiles}/**`, function(err)  {
			if (err) {
				console.log(`Block name: ${ o.n }.\nThere is an error while trying to delete block files.\n`, err);
				return;
			}
			console.log(`Files has been deleted for block -------- ${ o.n }.\nDeleted path: ${  pathToBlockFiles }`);
		});
	});

function createPugBlock(fileName) {
	const filePath = `./src/blocks/${ fileName }/${ fileName }.pug`;
	
	if ( fs.existsSync(filePath) ) {
		console.log(`Pug block already exist : ${ filePath }`);
		return;
	}
	
	const fileText = `.${ fileName}`;
	fs.writeFile(filePath, fileText, err => {
		if ( err ) console.log('Cannot create file block for PUG', err);
		console.log('Pug block created')
	});
}

function createStylesBlock(fileName) {
	const filePath = `./src/blocks/_${ fileName }.scss`;
	
	if ( fs.existsSync(filePath) ) {
		console.log(`Pug block already exist : ${ filePath }`);
		return;
	}
	
	const fileText = `.${ fileName } {\n\n}`;
	fs.writeFile(filePath, fileText, err => {
		if ( err ) console.log('Cannot create file block for STYLES', err);
		console.log('Sass block created')
	});
	
	const includeText = `\n@import 'blocks/_${ fileName }';`;
	fs.appendFile('./src/sass/main.scss', includeText,  err => {
		if ( err ) console.log('Cannot write to main styles file to include new block styles', err);
		console.log('Block styles has been included')
	});
}

program.parse(process.argv);
