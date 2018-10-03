import React from "react";
import api from '../api';
import Moment from 'moment';




class MySearches extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      mySearchesArray : []
     }
  }

// called automatically by React when the COMPONENT LOADS
componentDidMount() {

  // make the request to the API as soon as the component loads
  api.get("/mysearches/")
    .then(response => {
      console.log("All my searches: ", response.data);
      // when we get the data back setState() to update
      this.setState({ mySearchesArray: response.data} );
      console.log(this.state);
    })
    .catch(err => {
      console.log(err);
      alert("Sorry! Something went wrong. 💩");
    });
}

  render() { 
    const {mySearchesArray} = this.state;

    return ( 
      <section className="section-all-boxes">
        <h1>Historic of your searches</h1>
        <hr/>
      <div className="all-boxes">
      {mySearchesArray.map((oneSearch, index) =>
        <div className="box box-mysearch">
          <img className="icon-box-mysearch" src="./images/delete-button.svg" alt=""/>
          <h3>{oneSearch.city}</h3>
          <div>
            <li>Date range: {Moment(oneSearch.startDate).format('DD MMM YY')} - {Moment(oneSearch.endDate).format('DD MMM YY')}</li>
            <li>Maximum Monthly Rent: {oneSearch.maxPrice}$</li>
            <li>Days you picked: see the days</li>
          </div>
          <hr/>
          <div>
            <img className="icon-box-information" src="./images/information.svg" alt=""/>
            <div>
              <li>Number of results: {oneSearch.results.length}</li>
              <li>Max Total Ratio: { (oneSearch.results.length) ? Math.max.apply(null, oneSearch.results) : "-"}</li>
            </div>
          </div>
        </div>
        )}
        </div>
      </section>
     );
  }
}
 
export default MySearches;