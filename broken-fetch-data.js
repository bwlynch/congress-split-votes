//import fetch from 'node-fetch';
const fetch = require('node-fetch');
const fs = require('fs');

//Gathers all data between startingDate and the current date
var date = new Date();
var currentDay = date.getDate();
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();
var startingDate = "2018-01-01";


//defines the url and headers for the api call
//let url = "https://api.propublica.org/congress/v1/both/votes/2010-01-01/" + currentYear + "-" + currentMonth + "-" + currentDay  + ".json"
let url = "https://api.propublica.org/congress/v1/both/votes/2010-01-01/2020-01-01.json"


const options = {
  headers: {
    "X-API-Key": "C7Wf8TJ7wlyHtRLb2IFgzFOdanKYOXByS9SqEUFT"
  }
};

//fetches the data and writes it to ./data/data.json
fetch(url, options)
  .then( res => res.json() )
  .then(data => fs.writeFileSync('./data/data.json', JSON.stringify(data)));
