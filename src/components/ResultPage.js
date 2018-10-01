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
    const mySelectedDays = `.DayPicker-Day--mySelectedDays {
      background-color: green;
      color: white;
    }`;
    const searchSelectedDays = `.DayPicker-Day--searchSelectedDays {
      background-color: blue;
      color: white;
    }`;
    const duplicatedDays = `.DayPicker-Day--duplicatedDays {
      background-color: red;
      color: white;
    }`;
    
    const modifiers = {
      mySelectedDays: [],
      searchSelectedDays: [],
      duplicatedDays: [],
    };

    oneSearch.mySelectedDaysInRange.forEach(oneDay => {
      return modifiers.mySelectedDays.push(new Date(oneDay));
    })

    oneSearch.searchesSelectedDaysInRange.forEach(oneDay => {
      return modifiers.searchSelectedDays.push(new Date(oneDay));
    })

    oneSearch.duplicatedDays.forEach(oneDay => {
      return modifiers.duplicatedDays.push(new Date(oneDay));
    })
    
    console.log(oneSearch);


    return (
      <div>
        <h2>{oneSearch.searchObject.owner.firstName} {oneSearch.searchObject.owner.lastName}</h2>
        <p>He stays from <br/>{Moment(oneSearch.searchObject.startDate).format('DD/MM/YYYY')} to {Moment(oneSearch.searchObject.endDate).format('DD/MM/YYYY')}</p>
        <p>You stay from <br/>{Moment(oneSearch.mySearch.startDate).format('DD/MM/YYYY')} to {Moment(oneSearch.mySearch.endDate).format('DD/MM/YYYY')}</p>
        <p>Date range in common: <br/> {Moment(oneSearch.dateRangeMatch.dateRangeIntersection.start).format('DD/MM/YYYY')} - {Moment(oneSearch.dateRangeMatch.dateRangeIntersection.start).format('DD/MM/YYYY')}</p>
        <style>{mySelectedDays}{searchSelectedDays}{duplicatedDays}</style>
        <DayPicker modifiers={modifiers} month={new Date(oneSearch.dateRangeMatch.dateRangeIntersection.start)} fromMonth={new Date(oneSearch.dateRangeMatch.dateRangeIntersection.start)} toMonth={new Date(oneSearch.dateRangeMatch.dateRangeIntersection.end)} />
      </div>
      );
  }
}
 
export default ResultPage;