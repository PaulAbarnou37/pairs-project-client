import React from "react";
import api from '../api';
// import Moment from 'react-moment';
import Moment from 'moment';
import ResultPage from './ResultPage';

 

class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchArray: [],
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
      this.setState({ searchArray: response.data}, () => this.ratioSearchArray() );
    })
    .catch(err => {
      console.log(err);
      alert("Sorry! Something went wrong. 💩");
    });
}

ratioSearchArray (){
  const {searchArray} = this.state;
  const newSearchArray = [...searchArray];
  const { params } = this.props.match;

    newSearchArray.map(oneSearch => {
      
    oneSearch.dateRangeRatio = Number(((((new Date(oneSearch.dateRangeMatch.dateRangeIntersection.end).getTime() - new Date(oneSearch.dateRangeMatch.dateRangeIntersection.start).getTime()) /1000/60/60/24)/ oneSearch.dateRangeMatch.myStartToEndDate) * 100).toFixed(0));
    oneSearch.totalMatchRatio = ((oneSearch.dateRangeRatio + Number(oneSearch.priceMatch) + Number(oneSearch.scoreSelectedDays)*2)/4).toFixed(0);
  })
  this.setState({searchArray : newSearchArray})
  this.sortSearchArray();
  api.post(`/searches/${params.searchId}`, newSearchArray)
        .then(response => {
          console.log("All my results :", response.data);
        })
        .catch(err => {
          console.log(err);
          alert("Sorry! Something went wrong. 💩");
        });
}                                                                                        


sortSearchArray (){
  const { searchArray } = this.state;
  const newSearchArrayCopy = [...searchArray]
  newSearchArrayCopy.sort((a, b) => b.totalMatchRatio - a.totalMatchRatio)
  this.setState({searchArray : newSearchArrayCopy})
}




  render() { 
    const { params } = this.props.match;
    const { searchArray } = this.state;
    console.log('This is my searchArray', searchArray);

    return ( 
      <div className="search-results">

      <h1>Your search results for</h1>

      <p>City: Paris - Maximum Monthly Rent: 500$ - From 01/10/2018 until 01/03/2018</p>
        
      <ul className="search-element">
      {searchArray.map((oneSearch, index) => 
      <li key= {index}> 
  
  <div className="box box-resultslist">
  <article className="media">
  <div className="block-content">
    <div className="media-left">
      <figure className="image is-64x64">
        <img className="is-rounded" src={oneSearch.searchObject.owner.avatar}
 alt="Image"/>
      </figure>
    </div>
    <div className="media-content">
      <div className="content">
        <div className="fb-icons">
          <div>
          <strong>{oneSearch.searchObject.owner.firstName} {oneSearch.searchObject.owner.lastName}</strong> <small> <p><span>Posted on </span>        
        {Moment(oneSearch.searchObject.createdAt).format('DD-MM-YYYY')}
      </p></small>
      </div>

      <div className="hey-box"><img src="/images/linkedin.svg" alt=""/> <img src="/images/facebook.svg" alt=""/></div>
        </div>
         
          <br/>
          <p>{oneSearch.searchObject.owner.description}</p>
          <div className="range-date-whole">
          <div className="range-date-text">
            <p>{oneSearch.searchObject.owner.firstName} will be in Paris from</p>
            <p>Date range in common</p>
          </div>
          <div className="range-date">
            <p>:  {Moment(oneSearch.searchObject.startDate).format('DD MMM YYYY')}      
           <span> - </span>  
          {Moment(oneSearch.searchObject.endDate).format('DD MMM YYYY')}</p>
          <p>:  {Moment(oneSearch.dateRangeMatch.dateRangeIntersection.start).format('DD MMM YYYY')} - {Moment(oneSearch.dateRangeMatch.dateRangeIntersection.end).format('DD MMM YYYY')}</p>
          </div>
          </div>
          <hr/>
          <div className="match-results">
          <div className="ratio-result-box">
          <div>
            <img src="/images/daterange.png" alt=""/>
            </div>
          <p><span className="search-bold-text">Date Range:</span><br/><span className="pourcentage-match">{oneSearch.dateRangeRatio}%</span> </p> 
          </div>
          <div className="ratio-result-box">
          <div>
          <img src="/images/coin.svg" alt=""/></div>
          <p><span className="search-bold-text">Max Price:</span><br/><span className="pourcentage-match">{(oneSearch.priceMatch).toFixed(0)}%</span></p>
          </div>
          <div className="ratio-result-box">
          <div>
          <img src="/images/calendar.svg" alt=""/></div>
          <p><span className="search-bold-text">Days Selected:</span><br/><span className="pourcentage-match">{(oneSearch.scoreSelectedDays).toFixed(0)}%</span></p>
          </div >
          <div className="equal-img">
            <img src="/images/equal-math.svg" alt=""/>
          </div>
          <div className="total-block">
          <p className="search-total-text"><span className="search-bold-text">Total:</span><br/><span className="pourcentage-match total">{oneSearch.totalMatchRatio}%</span></p>
          </div>
          </div>

          

        
      </div>
    </div>
    </div>
          <ResultPage oneSearch={oneSearch}/>
  </article>
  {/* <Link to={{pathname:`/search/${params.searchId}/details`, state: {oneSearch}}}><button className="button-search-list">See more details 🔍</button></Link> */}
</div>
    
      </li>
      )}
      </ul>

      </div>

     );
  }
}
 
export default SearchList;
