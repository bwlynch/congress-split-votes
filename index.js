function processData(data1) {
  for (i = 0; i < 20; i++) {
    //console.log(i + ' - Title: ' + data1.results.votes[i].bill.title + '\n');
    let demSplit = checkForSplits(data1, 'democratic');
    let repSplit = checkForSplits(data1, 'republican');
    if (demSplit && repSplit) {
      console.log('QUALIFIED');
      console.log('\n\n\n\n');
    }
  }
}


function checkForSplits(data1, party) {
  var yes = data1.results.votes[i][party].yes;
  var no = data1.results.votes[i][party].no;
  var split;

  //console.log(party + ':');

  if (Math.abs(.5 - yes/(yes + no)) < .25) {
    /*split = true;
    console.log(i + ' - Title: ' + data1.results.votes[i].bill.title + '\n');
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
  console.log(yes);
  console.log(no);
  console.log(yes/(yes+no));
  return split;
}


for (var j = 0; j < 10; j++) {
  let fileLocation = './data' + j + '.json';
  let data = require(fileLocation)
  console.log(fileLocation);
  processData(data);
}
console.log('end-ish');

let fileLocation2 = './data-test.json';
let data = require(fileLocation2)
processData(data);


