import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './data.json';


class Main extends React.Component {
  render() {
    let everything = [];
    for (let entry in data['table']) {
      //filter out votes for which there is no title, as this usually indicates very little meaningful information for the entry to display on the site
      if (data['table'][entry].title != null) {
	everything.unshift(<p><b>{data['table'][entry].chamber} {data['table'][entry].number}</b> <a href={data['table'][entry].url}>{data['table'][entry].title}</a><br/>
          {data['table'][entry].billDescription}<br/>
          {data['table'][entry].date}<br/>
          Democratic Votes: Yes {data['table'][entry].democraticYes},
          No {data['table'][entry].democraticNo}<br/>
          Republican Votes: Yes {data['table'][entry].republicanYes},
          No {data['table'][entry].republicanNo}
          <br/><br/><br/></p>);
      }
    }
    return (
      <div><div class="menu"></div>
      <div class="mainframe"><div class="head"><br/><h1>Votes that Split the Parties</h1>
      <p>The increased partisanship in U.S. politics has led to an increase in party line votes where each party votes more or less as a bloc. However there are still some issues that divide the parties. Below is a list of every congressional vote since 2010 where both parties were split, defined as instances where at least a quarter of each party voted differently from the majority of the party.</p><br/></div>
      <div class="center">{everything}</div></div></div>
    );
  }
}


ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

