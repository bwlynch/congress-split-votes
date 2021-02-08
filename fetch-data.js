//import packages;
const fetch = require('node-fetch');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();



//Used by each iteration of the for loop to fetch data for the given month and year
function makeAPICall(url, options, month, year) {
  fetch(url, options)
    .then( res => res.json() )
    .then(data => {return data;})
	//.then(data => dataArray[year + month] = data);
	    //fs.writeFileSync('./data/data-' + year + '-' + month + '.json', JSON.stringify(data)));
}

//Gets current date and converts it to months by multiplying year by 12
var date = new Date();
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();
var totalMonths = (currentYear * 12) + currentMonth;
var startingYear = (process.env.STARTING_YEAR != null || process.env.STARTING_YEAR != '') ? process.env.STARTING_YEAR : 2010;
var fixedMonth;
var apiKey = process.env.API_KEY;
var dataArray = [];
var dataset = [];

//Gets data for every month from January of startingYear until the current month and writes it to a file
for (let i = (startingYear * 12); i <= totalMonths; i++) {
  var tempMonth = (i % 12) + 1;
  var tempYear = Math.floor(i/12);

  //defines the url and headers for the api call
  let url = "https://api.propublica.org/congress/v1/both/votes/" + tempYear + "/" + tempMonth + ".json";
  const options = {
    headers: {
      "X-API-Key": apiKey
    }
  };

  //For better formatting in the data file names, convert number less than 10 to starting with 0, e.g. 01, 02, 03 instead of 1, 2, 3
  fixedMonth = tempMonth;
  if (tempMonth < 10) {
    fixedMonth = '0' + tempMonth;
  }

  dataset.push(fetch(url, options)
    .then( res => res.json() )
    .then(data => data))
          //.then(data => dataArray[year + month] = data);
              //fs.writeFileSync('./data/data-' + year + '-' + month + '.json', JSON.stringify(data)));
}
	
//  dataArray.push(datatest)
//}


var obj = {
   table: []
};

Promise.all(dataset).then(data => {
  //console.log(data);
  for (var j in data) {
  //console.log(data[j].results.votes);
  for (var i in data[j].results.votes) {
    demYes = data[j].results.votes[i]['democratic'].yes,
    demNo = data[j].results.votes[i]['democratic'].no,
    repYes = data[j].results.votes[i]['republican'].yes,
    repNo = data[j].results.votes[i]['republican'].no
    if ((Math.abs(.5 - demYes/(demYes + demNo)) < .25) && (Math.abs(.5 - repYes/(repYes + repNo)) < .25)) {
      obj.table.push({'title': data[j].results.votes[i].bill.title,
       'date': data[j].results.votes[i].date,
       'number': data[j].results.votes[i].bill.number,
       'chamber': data[j].results.votes[i].chamber,
       'billDescription': data[j].results.votes[i].description,
       'url': data[j].results.votes[i].url,
       'democraticYes': data[j].results.votes[i]['democratic'].yes,
       'democraticNo': data[j].results.votes[i]['democratic'].no,
       'republicanYes': data[j].results.votes[i]['republican'].yes,
       'republicanNo': data[j].results.votes[i]['republican'].no});
    }



    /*//console.log(i + ' - Title: ' + data.results.votes[i].bill.title + '\n');
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
    }*/
  }
  //console.log(obj);
 }
 var newJSON = JSON.stringify(obj);
 console.log(newJSON);
 fs.writeFile('./src/data.json', newJSON, function(err) {
    if (err) throw err;
    console.log('complete');
    });
});

//var newJSON = JSON.stringify(obj);
//console.log(newJSON);
