const fs = require('fs');

var glob = require( 'glob' )
  , path = require( 'path' );

var data = {}

glob.sync( 'data/**/*.json' ).forEach( function( file ) {
  data[file] = require( path.resolve( file ) );
});

fs.writeFileSync('./a.json', JSON.stringify(data))
