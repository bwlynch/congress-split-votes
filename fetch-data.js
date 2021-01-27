//import fetch from 'node-fetch';
const fetch = require('node-fetch');
const fs = require('fs');

//Used by each iteration of the for loop to fetch data for the given month and year
function makeAPICall(url, options, month, year) {
  fetch(url, options)
    .then( res => res.json() )
    .then(data => fs.writeFileSync('./data/data-' + year + '-' + month + '.json', JSON.stringify(data)));
}

//Gets current date and converts it to months by multiplying year by 12
var date = new Date();
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();
var totalMonths = (currentYear * 12) + currentMonth;
var startingYear = 2018;
var fixedMonth;

//Gets data for every month from January of startingYear until the current month and writes it to a file
for (let i = (startingYear * 12); i <= totalMonths; i++) {
  var tempMonth = (i % 12) + 1;
  var tempYear = Math.floor(i/12);

  //defines the url and headers for the api call
  let url = "https://api.propublica.org/congress/v1/both/votes/" + tempYear + "/" + tempMonth + ".json";
  const options = {
    headers: {
      "X-API-Key": "C7Wf8TJ7wlyHtRLb2IFgzFOdanKYOXByS9SqEUFT"
    }
  };

  //For better formatting in the data file names, convert number less than 10 to starting with 0, e.g. 01, 02, 03 instead of 1, 2, 3
  fixedMonth = tempMonth;
  if (tempMonth < 10) {
    fixedMonth = '0' + tempMonth;
  }

  makeAPICall(url, options, fixedMonth, tempYear);
}
