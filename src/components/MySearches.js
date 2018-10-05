import React from "react";
import api from '../api';
import Moment from 'moment';
import { Link } from "react-router-dom";




class MySearches extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      mySearchesArray : []
     }
  }

  // called automatically by React when the COMPONENT LOADS
  componentDidMount() {
    this.getSearches();
  }

  getSearches() {
    // make the request to the API as soon as the component loads
    api.get("/mysearches/")
      .then(response => {
        // when we get the data back setState() to update
        this.setState({ mySearchesArray: response.data} );
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! Something went wrong. 💩");
      });
  }

  removeBox(id){
    api.delete(`/searches/${id}`)
      .then(response => {
        this.getSearches();
      })
      .catch(err => {
        console.log("error", err);
        alert("Sorry! Something went wrong")
      })
  }
// /search/${id}

  render() { 
    const {mySearchesArray} = this.state;

    return ( 
      <section className="section-all-boxes">
        <h1>Historic of your searches</h1>
        <hr/>
      <div className="all-boxes">
      {mySearchesArray.map((oneSearch, index) =>
      <Link className="link-mysearches" to={`/search/${oneSearch._id}`}>
        <div key={index} className="box box-mysearch">
        
        <div className="div-img-delete"><img key={index} onClick={ () => this.removeBox(oneSearch._id)} className="icon-box-mysearch" src="./images/delete-button.svg" alt=""/></div>
          <h3>{oneSearch.city}</h3>
          <div className="primary-info-box">
            <li><span>Date range:</span> {Moment(oneSearch.startDate).format('DD MMM YY')} - {Moment(oneSearch.endDate).format('DD MMM YY')}</li>
            <li><span>Maximum Monthly Rent:</span> {oneSearch.maxPrice}$</li>
            <li><span>Days you picked:</span> see the days</li>
          </div>
          <hr/>
          <div className="information-my-box">
            <div className="img-information"><img className="icon-box-information" src="./images/information.svg" alt=""/></div>
            <div className="stats-my-box">
              <li>Number of results: {oneSearch.results.length}</li>
              <li>Max Total Ratio: { (oneSearch.results.length) ? Math.max.apply(null, oneSearch.results) : "-"}</li>
            </div>
          </div>
        </div>
        </Link>
        
        )}
        </div>
      </section>
     );
  }
}
 
export default MySearches;