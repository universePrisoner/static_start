const program = require('commander');
const fs      = require('fs');

program
	.command('createBlock')
	.description('Create and include to project new block for pug and styles.')
	.option('--n <val>, --name <val>', 'New block name')
	.action(function(o) {
		if ( ! o.n ) {
			console.log('--------\nName for the block did not specified\n--------');
			return;
		}
		
		createPugBlock(o.n);
		
		createStylesBlock(o.n);
	});


function createPugBlock( fileName ) {
	const filePath = `./src/pug/blocks/${ fileName }.pug`;
	
	if ( fs.existsSync(filePath) ) {
		console.log(`Pug block already exist : ${ filePath }`);
		return;
	}
	
	const fileText = `.${ fileName }`;
	fs.writeFile(`./src/pug/blocks/${ fileName }.pug`, fileText, err => {
		if ( err ) console.log('Cannot create file block for PUG', err);
		console.log('Pug block created')
	});
}

function createStylesBlock( fileName ) {
	const filePath = `./src/sass/blocks/_${ fileName }.sass`;
	
	if ( fs.existsSync(filePath) ) {
		console.log(`Pug block already exist : ${ filePath }`);
		return;
	}
	
	const fileText = `.${ fileName } {\n\n}`;
	fs.writeFile(`./src/sass/blocks/_${ fileName }.sass`, fileText, err => {
		if ( err ) console.log('Cannot create file block for STYLES', err);
		console.log('Sass block created')
	});
	
	const importText = `\n@import 'blocks/_${ fileName }';`;
	fs.appendFile('./src/sass/main.scss', importText,  err => {
		if ( err ) console.log('Cannot write to main styles file to include new block styles', err);
		console.log('Block styles has been included')
	});
}

program.parse(process.argv);
