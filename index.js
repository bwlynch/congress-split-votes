var glob = require( 'glob' )
  , path = require( 'path' );

function processData(data) {
  for (i in data.results.votes) {
    //console.log(i + ' - Title: ' + data.results.votes[i].bill.title + '\n');
    let demSplit = checkForSplits(data.results.votes[i], 'democratic');
    let repSplit = checkForSplits(data.results.votes[i], 'republican');
    if (demSplit && repSplit) {
      console.log('QUALIFIED');
      console.log('\n\n\n\n');
    }
  }
}


function checkForSplits(dataVotes, party) {
  var yes = dataVotes[party].yes;
  var no = dataVotes[party].no;
  var split;

  //console.log(party + ':');

  if (Math.abs(.5 - yes/(yes + no)) < .25) {
    split = true;
    /*console.log(i + ' - Title: ' + data1.results.votes[i].bill.title + '\n');
    console.log(party);
    console.log(yes);
    console.log(no);
    console.log('split');
    console.log('\n\n');*/
  }
  else {
    split = false;
    //console.log('not split');
  }
  /*console.log(yes);
  console.log(no);
  console.log(yes/(yes+no));*/
  return split;
}




//imports all files in the directory './data' into an object named data
var data = {}

glob.sync( 'data/**/*.json' ).forEach( function( file ) {
  data[file] = require( path.resolve( file ) );
});


//console.log(data['data-2019-08.json']);

for (i in data) {
  console.log(i);
  //console.log(data[i]);
  processData(data[i]);
}





/*for (var j = 0; j < 10; j++) {
  let fileLocation = './data' + j + '.json';
  let data = require(fileLocation)
  console.log(fileLocation);
  processData(data);
}
console.log('end-ish');

let fileLocation2 = './data-test.json';
let data = require(fileLocation2)
processData(data);

*/
