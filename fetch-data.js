//import packages
const fetch = require('node-fetch');
const fs = require('fs');


//Gets current date and converts it to months by multiplying year by 12
var date = new Date();
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();
var totalMonths = (currentYear * 12) + currentMonth;
var startingYear = (process.env.STARTING_YEAR != null || process.env.STARTING_YEAR != '') ? process.env.STARTING_YEAR : 2010;
var apiKey = process.env.API_KEY;
var dataset = [];

//Gets data for every month from January of startingYear until the current month and writes it to a file
for (let i = (startingYear * 12); i <= totalMonths; i++) {
  var tempMonth = (i % 12) + 1;
  var tempYear = Math.floor(i/12);

  //Defines the url and headers for the api call
  let url = "https://api.propublica.org/congress/v1/both/votes/" + tempYear + "/" + tempMonth + ".json";
  const options = {
    headers: {
      "X-API-Key": apiKey
    }
  };

  //Fetches the data from the api canadds it to an array
  dataset.push(fetch(url, options)
    .then( res => res.json() )
    .then(data => data))
}

//defines object for storing filtered data
var dataObj = {
   table: []
};

//Waits until all api calls have resolved and added their contents to the array 'dataset', then adds key data to dataObj if the republicans and democrats both split votes
Promise.all(dataset).then(data => {
  for (var j in data) {
    for (var i in data[j].results.votes) {
      demYes = data[j].results.votes[i]['democratic'].yes,
      demNo = data[j].results.votes[i]['democratic'].no,
      repYes = data[j].results.votes[i]['republican'].yes,
      repNo = data[j].results.votes[i]['republican'].no
      if ((Math.abs(.5 - demYes/(demYes + demNo)) < .25) && (Math.abs(.5 - repYes/(repYes + repNo)) < .25)) {
        dataObj.table.push({'title': data[j].results.votes[i].bill.title,
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
    }
  }
  //Converts dataObj to JSON and then writes it to ./src/data.json
  var newJSON = JSON.stringify(dataObj);
  fs.writeFile('./src/data.json', newJSON, function(err) {
    if (err) throw err;
    console.log('complete');
  });
});
