import React from "react";
import Moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 

     }
  }

  

  render() { 
    const { oneSearch } = this.props.location.state;
    const birthdayStyle = `.DayPicker-Day--highlighted {
      background-color: orange;
      color: white;
    }`;
    
    const modifiers = {
      highlighted: [],
    };

    // oneSearch.mySelectedDaysInRange.forEach( )
    
    console.log(oneSearch);


    return (
      <div>
        <h2>{oneSearch.searchObject.owner.firstName} {oneSearch.searchObject.owner.lastName}</h2>
        <p>He stays from <br/>{Moment(oneSearch.searchObject.startDate).format('DD/MM/YYYY')} to {Moment(oneSearch.searchObject.endDate).format('DD/MM/YYYY')}</p>
        <p>You stay from <br/>{Moment(oneSearch.mySearch.startDate).format('DD/MM/YYYY')} to {Moment(oneSearch.mySearch.endDate).format('DD/MM/YYYY')}</p>
        <p>Date range in common: <br/> {Moment(oneSearch.dateRangeMatch.dateRangeIntersection.start).format('DD/MM/YYYY')} - {Moment(oneSearch.dateRangeMatch.dateRangeIntersection.start).format('DD/MM/YYYY')}</p>
        <style>{birthdayStyle}</style>
        <DayPicker modifiers={modifiers} />
      </div>
      );
  }
}
 
export default ResultPage;