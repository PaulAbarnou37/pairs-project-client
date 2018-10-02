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
    const { oneSearch } = this.props;
    const mySelectedDays = `.DayPicker-Day--mySelectedDays {
      background-color: #44AF69;
      color: white;
    }`;
    const searchSelectedDays = `.DayPicker-Day--searchSelectedDays {
      background-color: #6CCFF6;
      color: white;
    }`;
    const duplicatedDays = `.DayPicker-Day--duplicatedDays {
      background-color: #00171F;
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

    if (oneSearch.duplicatedDays.length > 0){
    oneSearch.duplicatedDays.forEach(oneDay => {
      return modifiers.duplicatedDays.push(new Date(oneDay));
    })}
    
    console.log(oneSearch);


    return (
      <div>
        {/* <h2>{oneSearch.searchObject.owner.firstName} {oneSearch.searchObject.owner.lastName}</h2>
        <p>He stays from <br/>{Moment(oneSearch.searchObject.startDate).format('DD/MM/YYYY')} to {Moment(oneSearch.searchObject.endDate).format('DD/MM/YYYY')}</p>
        <p>You stay from <br/>{Moment(oneSearch.mySearch.startDate).format('DD/MM/YYYY')} to {Moment(oneSearch.mySearch.endDate).format('DD/MM/YYYY')}</p>
        <p>Date range in common: <br/> {Moment(oneSearch.dateRangeMatch.dateRangeIntersection.start).format('DD/MM/YYYY')} - {Moment(oneSearch.dateRangeMatch.dateRangeIntersection.end).format('DD/MM/YYYY')}</p>
        <p>Date Range Match : {((((new Date(oneSearch.dateRangeMatch.dateRangeIntersection.end).getTime() - new Date(oneSearch.dateRangeMatch.dateRangeIntersection.start).getTime()) /1000/60/60/24)/ oneSearch.dateRangeMatch.myStartToEndDate) * 100).toFixed(0)}% </p> 
        <p>Pourcentage Matching Max Price: {(oneSearch.priceMatch).toFixed(0)}%</p>
        <p>Days Selected Match: {(oneSearch.scoreSelectedDays).toFixed(0)}%</p>
        <p>Total Match: {((((((new Date(oneSearch.dateRangeMatch.dateRangeIntersection.end).getTime() - new Date(oneSearch.dateRangeMatch.dateRangeIntersection.start).getTime()) /1000/60/60/24)/ oneSearch.dateRangeMatch.myStartToEndDate) * 100) + oneSearch.priceMatch + (oneSearch.scoreSelectedDays*2))/4).toFixed(0)}%</p> */}

        <style>{mySelectedDays}{searchSelectedDays}{duplicatedDays}</style>
        <DayPicker modifiers={modifiers} month={new Date(oneSearch.dateRangeMatch.dateRangeIntersection.start)} fromMonth={new Date(oneSearch.dateRangeMatch.dateRangeIntersection.start)} toMonth={new Date(oneSearch.dateRangeMatch.dateRangeIntersection.end)} />
      </div>
      );
  }
}
 
export default ResultPage;