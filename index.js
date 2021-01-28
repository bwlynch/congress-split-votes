var glob = require( 'glob' )
  , path = require( 'path' );

function processData(data) {
  for (i in data.results.votes) {
    //console.log(i + ' - Title: ' + data.results.votes[i].bill.title + '\n');
    let demSplit = checkForSplits(data.results.votes[i], 'democratic');
    let repSplit = checkForSplits(data.results.votes[i], 'republican');
    if (demSplit && repSplit) {
      console.log('Date: ' + data.results.votes[i].date);
      console.log('Title: ' + data.results.votes[i].bill.title);
      console.log('Number: ' + data.results.votes[i].bill.number);
      console.log('Chamber: ' + data.results.votes[i].chamber);
      console.log('Bill Description: ' + data.results.votes[i].description);
      console.log('URL: ' + data.results.votes[i].url);
      console.log('\nDemocratic Yes: ' + data.results.votes[i]['democratic'].yes);
      console.log('Democratic No: ' + data.results.votes[i]['democratic'].no);
      console.log('Republican Yes: ' + data.results.votes[i]['republican'].yes);
      console.log('Republican No: ' + data.results.votes[i]['republican'].no);

      console.log('\n\n\n');
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
  //console.log(i);
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
