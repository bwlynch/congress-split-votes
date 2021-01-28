var glob = require( 'glob' )
  , path = require( 'path' );

var data = {}

glob.sync( 'data/**/*.json' ).forEach( function( file ) {
  data[file] = require( path.resolve( file ) );
});

//console.log(data['data/data-2021-01.json'].status);

for (i in data) {
  console.log(node[i].status);
}
