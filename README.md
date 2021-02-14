## Congressional Split Votes site


### Table of Contents

  1. [Intro](#intro)
  1. [Dependencies](#dependencies)
  1. [Update the data](#update-the-data)
  1. [Deploy Locally](#deploy-locally)
  1. [Rebuild and Deploy as Static Site](#rebuild-and-deploy-as-static-site)
  1. [Author](#author)

### Intro
This site seeks to find issues that crosscut traditional partisan divisions by showing a list of congressional votes that divided both parties (defined as votes in which at least a quarter of each party voted against the majority of the party). An example of the deployed site can be found [here](https://splitvotes.benwlynch.com). The site uses data on congressional votes pulled using the [ProPublica Congress API](https://projects.propublica.org/api-docs/congress-api/). 

### Deploy a Copy
To deploy the site as a static site without making any alterations, deploy the files found in the build directory.

### Dependencies

The site requires node to be installed, which can be done [here](https://nodejs.org/en/download/). To install the node dependencies for the site, run the command below. (Delete the file package-lock.json beforehand in order to update the versions of the dependencies.)

`npm install`

### Update the data
To update the data to include a different time period, use the file fetch-data.js. First, you will need to get your own API key for the ProPublica Congress API by requesting one [here](https://www.propublica.org/datastore/api/propublica-congress-api). Then create a .env from the default template using.

`cp .env.default .env`

Set API_KEY equal to the api key you received. By default, the script pulls all data from January 2010 through the current month. STARTING_YEAR can be optionally set in the .env file to change the beginning month it pulls data from (e.g. STARTING_YEAR=2005 will pull from January 2005 through the current month).

Then, run the following command to update the data file, located in src/data.json. Note that running the command will overwrite the contents of the file with the data pulled.

`node fetch-data.js`

### Deploy Locally

Launch the site at localhost:3000.

`npm start`

### Rebuild and Deploy as Static Site

Once the data has been updated, use the command below to rebuild the site within the build directory. Then deploy the updated contents of the build directory.

`npm run build`

### Author

  * <b>Ben Lynch</b>
