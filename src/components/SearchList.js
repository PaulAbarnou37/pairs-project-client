import React from "react";
import api from '../api';
// import Moment from 'react-moment';
import Moment from 'moment';
import { Link } from "react-router-dom";

 

class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchArray: []
     }
  }

// called automatically by React when the COMPONENT LOADS
componentDidMount() {
  const { params } = this.props.match;

  // make the request to the API as soon as the component loads
  api.get(`/searches/${params.searchId}`)
    .then(response => {
      console.log("All searches: ", response.data);
      // when we get the data back setState() to update
      this.setState({ searchArray: response.data});
    })
    .catch(err => {
      console.log(err);
      alert("Sorry! Something went wrong. 💩");
    });
}



  render() { 
    const { params } = this.props.match;
    const { searchArray } = this.state;
    console.log('This is my searchArray', searchArray);

    return ( 
      <div>
      <ul>
      {searchArray.map((oneSearch, index) => 
      <li className="search-element" key= {index}> 
      {oneSearch.searchObject.owner.firstName} {oneSearch.searchObject.owner.lastName} 
      
      <p><span>Posted on </span>        
        {Moment(oneSearch.searchObject.createdAt).format('DD-MM-YYYY')}
      </p>
      <p>City: {oneSearch.searchObject.city}</p>

      {/* -------------------------------------------------------------------------------- */}
      {/* ------------------------START RANGE DATE CALCULATION---------------------------- */}
      {/* -------------------------------------------------------------------------------- */}

      <span>From: </span>
      {Moment(oneSearch.searchObject.startDate).format('DD-MM-YYYY')}      
      <span> to: </span> 
      {Moment(oneSearch.searchObject.endDate).format('DD-MM-YYYY')}      

      
      <div> <span> Date range in common : from </span>
      {Moment(oneSearch.dateRangeMatch.dateRangeIntersection.start).format('DD-MM-YYYY')}      
        <span> to </span>
      {Moment(oneSearch.dateRangeMatch.dateRangeIntersection.end).format('DD-MM-YYYY')}      

      
        </div>

      {/* -------------------------------------------------------------------------------- */}
      {/* ------------------------MAX PRICE MATCH CALCULATION----------------------------- */}
      {/* -------------------------------------------------------------------------------- */}
     
      <p>Max Price: {oneSearch.searchObject.maxPrice}</p>
      <p>Date Range Match : {((((new Date(oneSearch.dateRangeMatch.dateRangeIntersection.end).getTime() - new Date(oneSearch.dateRangeMatch.dateRangeIntersection.start).getTime()) /1000/60/60/24)/ oneSearch.dateRangeMatch.myStartToEndDate) * 100).toFixed(0)}% </p> 
      <p>Pourcentage Matching Max Price: {(oneSearch.priceMatch).toFixed(0)}%</p>
      <p>Days Selected Match: {(oneSearch.scoreSelectedDays).toFixed(0)}%</p>
      <p>Total Match: {((((((new Date(oneSearch.dateRangeMatch.dateRangeIntersection.end).getTime() - new Date(oneSearch.dateRangeMatch.dateRangeIntersection.start).getTime()) /1000/60/60/24)/ oneSearch.dateRangeMatch.myStartToEndDate) * 100) + oneSearch.priceMatch + (oneSearch.scoreSelectedDays*2))/4).toFixed(0)}%</p>
      <p><Link to={{pathname:`/search/${params.searchId}/details`, state: {oneSearch}}}>See more details</Link></p>

      </li>
      )}
      </ul>

      </div>

     );
  }
}
 
export default SearchList;
