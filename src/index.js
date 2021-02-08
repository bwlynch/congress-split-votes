import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './data.json';


/*class Main extends React.Component {
  render() {
    return (
      <h1>Title</h1>
      <div>abc
      </div>
    );
  }
}*/



class Main extends React.Component {
  /*constructor(props) {
    super(props);
    //this.fillIn = this.fillIn.bind(this);
  }*/
	
  render() {
    /*let obj = {};
    fs.readFile('./data/data.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data);
    }
    })*/
    //let dataObj = JSON.parse(data);
    //console.log(dataObj);
    //console.log(dataObj[1]);
    //let admins = require('./data.json');
    //console.log(data[0][0]);
    let everything = [];
    for (let abc in data) {
      console.log('abc: ' + abc);
      for (let def in data[abc]) {
	console.log(data[abc][def].title);
        if (data[abc][def].title != null) {
	everything.unshift(<p><b>{data[abc][def].chamber} {data[abc][def].number}</b> <a href={data[abc][def].url}>{data[abc][def].title}</a><br/>
        {data[abc][def].billDescription}<br/>
        {data[abc][def].date}<br/>
        Democratic Votes: Yes {data[abc][def].democraticYes},
        No {data[abc][def].democraticNo}<br/>
        Republican Votes: Yes {data[abc][def].republicanYes},
        No {data[abc][def].republicanNo}
		<br/><br/><br/></p>);
	}
      }
    }
    let abcd = 'abc'//dataObj[1];
    return (
      <div><h1>Votes that Split the Parties</h1>
      <p>The increased partisanship in U.S. politics has led to an increase in party line votes where each party votes more or less as a bloc. However there are still some issues that divide the parties. Below is a list of every congressional vote since 2010 where both parties were split, defined as instances where at least a quarter of each party voted differently from the majority of the party.</p><br/>
      <div>{everything}</div></div>
    );
  }
}


ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

