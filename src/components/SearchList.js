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
        
      <ul className="search-element">
      {searchArray.map((oneSearch, index) => 
      <li key= {index}> 
  
  <div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{oneSearch.searchObject.owner.firstName} {oneSearch.searchObject.owner.lastName}</strong> <small> <p><span>Posted on </span>        
        {Moment(oneSearch.searchObject.createdAt).format('DD-MM-YYYY')}
      </p></small>
         
          <br/>
          <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <span>{oneSearch.searchObject.owner.firstName} will be in Paris from </span>
          {Moment(oneSearch.searchObject.startDate).format('DD MMM YYYY')}      
          <span> to </span> 
          {Moment(oneSearch.searchObject.endDate).format('DD MMM YYYY')}
          <p>Date Range in common: {Moment(oneSearch.dateRangeMatch.dateRangeIntersection.start).format('DD MMM YYYY')} - {Moment(oneSearch.dateRangeMatch.dateRangeIntersection.end).format('DD MMM YYYY')}</p>
          <div className="match-results">
          <p><span className="search-bold-text">Date Range:</span><br/><span className="pourcentage-match">{((((new Date(oneSearch.dateRangeMatch.dateRangeIntersection.end).getTime() - new Date(oneSearch.dateRangeMatch.dateRangeIntersection.start).getTime()) /1000/60/60/24)/ oneSearch.dateRangeMatch.myStartToEndDate) * 100).toFixed(0)}%</span> </p> 
          <p><span className="search-bold-text">Max Price:</span><br/><span className="pourcentage-match">{(oneSearch.priceMatch).toFixed(0)}%</span></p>
          <p><span className="search-bold-text">Days Selected:</span><br/><span className="pourcentage-match">{(oneSearch.scoreSelectedDays).toFixed(0)}%</span></p>
          <p className="search-total-text"><span className="search-bold-text">Total:</span><br/><span className="pourcentage-match">{((((((new Date(oneSearch.dateRangeMatch.dateRangeIntersection.end).getTime() - new Date(oneSearch.dateRangeMatch.dateRangeIntersection.start).getTime()) /1000/60/60/24)/ oneSearch.dateRangeMatch.myStartToEndDate) * 100) + oneSearch.priceMatch + (oneSearch.scoreSelectedDays*2))/4).toFixed(0)}%</span></p>
          </div>
          <Link to={{pathname:`/search/${params.searchId}/details`, state: {oneSearch}}}>See more details 🔍</Link>

          

        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="reply">
            <span class="icon is-small">
              <i class="fas fa-reply" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div>
    
      </li>
      )}
      </ul>

      </div>

     );
  }
}
 
export default SearchList;
