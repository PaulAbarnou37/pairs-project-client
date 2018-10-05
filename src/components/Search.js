import React from "react";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import api from '../api';
import { Redirect } from "react-router-dom";
import Helmet from 'react-helmet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';
// import MyComponent from './MultiDayPicker';



class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = { 
      owner: "",
      city: "",
      startDate: "",
      endDate: "",
      selectedDays: [],
      maxPrice: "",
      isSubmitSuccess: false,
      searchId: "",
      everyWeekDay: [],
      from: undefined,
      to: undefined,
     };
     this.handleDayClick = this.handleDayClick.bind(this);  
  }

  showFromMonth() {
    const { startDate, endDate } = this.state;
    if (!startDate) {
      return;
    }
    if (moment(endDate).diff(moment(startDate), 'months') < 2) {
      this.endDate.getDayPicker().showMonth(startDate);
    }
  }

  handleFromChange(startDate) {
    // Change the from date and focus the "to" input field
    this.setState({ startDate });
  }
  handleToChange(endDate) {
    this.setState({ endDate }, this.showFromMonth);
  }
 

  //Multi-date picker
  handleDayClick(day, { selected }) {
    console.log(day);
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }

  // update state on form completion

  updateCity(event){
    const { value } = event.target;
    this.setState({ city: value });
  }

  updateMaxPrice(event){
    const { value } = event.target;
    this.setState({ maxPrice: value });
  }

  updateStartDate(event){
    const { value } = event.target;
    this.setState({ startDate: value });
  }

  updateEndDate(event){
    const { value } = event.target;
    this.setState({ endDate: value });
  }

  updateDatePicked(event){
    const { value } = event.target;
    this.setState({ datePicked: value });
  }
  


  
getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

selectWeekDay (dayOfWeek){
  console.log('this is my weekday', dayOfWeek)
  const { startDate, endDate, selectedDays } = this.state;
  let datesArray = this.getDates(startDate, endDate);

  let everyDayOfWeeks = selectedDays.filter(oneSelectedDay => {
    return moment(oneSelectedDay).day() !== dayOfWeek;
  });

  if (everyDayOfWeeks.length === selectedDays.length) {
    datesArray.forEach(oneDay => {
      if (moment(oneDay).day() === dayOfWeek){
        everyDayOfWeeks.push(new Date(oneDay));
      }
    })
  };

  this.setState({selectedDays: everyDayOfWeeks})
   
  console.log(everyDayOfWeeks);
}





// On form submit

  handleSubmit(event) {
    event.preventDefault();
    const { _id } = this.props.currentUser;
    console.log('TEST', _id);
    this.setState({owner: _id}, () => {
      console.log('state owner:', this.state.owner);
  
      // PUT and POST requests receive a 2nd argument: the data to submit
      // (here we are submitting the state we've gathered in the form)
      api.post(`/search`, this.state)
        .then(response => {
          console.log("Search POST:", response.data);
          this.setState({ isSubmitSuccess: true, searchId: response.data._id });
        })
        .catch(err => {
          console.log(err);
          alert("Sorry! Something went wrong. 💩");
        });
    });

  }


  render() { 
    const { from, to } = this.state;

    const modifiers = { start: from, end: to };
    const {isSubmitSuccess, owner, city, startDate, endDate, selectedDays, maxPrice, searchId} = this.state;
  
    if (isSubmitSuccess) {
      // redirect back to the phone details page if the submission worked!
      // const { params } = this.props.match; => extraire url page actuelle
      return <Redirect to={`/search/${searchId}`} />
    }

    
    return (  
    
      <section className="search-form">
      <h1>Start your search</h1>

      <h3>Fill the form below to get a full overview bla bla blah voila</h3>
      
      <div className="box">
        <form onSubmit={event => this.handleSubmit(event)}>
        <div className='row'>
        <div className="left-search-form">
            <label className="input-form">
            <p className="text-form"><img src="./images/one.svg"></img> City:</p>
            <input value={city} type="text" placeholder=" 🏢 e.g. Paris"
                onChange={event => this.updateCity(event)} />
            </label>
            <label className="input-form">
            <p className="text-form"><img src="./images/two.svg"></img> Your max. monthly rent in $:</p>
              <input  value={maxPrice} type="number" placeholder=" 💵 500$"
                  onChange={event => this.updateMaxPrice(event)} />
            </label>
        
        
          <div className="two-range">
            <p className="text-form"><img src="./images/three.svg"></img> Your date range:</p>
            <div className="two-date-inside">
        <DayPickerInput className="range-picker"
          value={startDate}
          placeholder=" 🗓 From"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [startDate, { startDate, endDate }],
            disabledDays: { after: endDate },
            toMonth: endDate,
            modifiers,
            numberOfMonths: 1,
            onDayClick: () => this.endDate.getInput().focus(),
          }}
          onDayChange={this.handleFromChange}
          />{' '}
        -{' '}
          <DayPickerInput className="range-picker"
            ref={el => (this.endDate = el)}
            value={endDate}
            placeholder=" 🗓 To"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [startDate, { startDate, endDate }],
              disabledDays: { before: startDate },
              modifiers,
              month: startDate,
              fromMonth: startDate,
              numberOfMonths: 1,
            }}
            onDayChange={this.handleToChange}
            />
            </div>
          </div>
          <label className="input-form">
            <p className="text-form"><img src="./images/four.svg"></img> Do you have a apartment available?</p>
            
              <input  value={maxPrice} type="number" placeholder=" 💵 500$"
                  onChange={event => this.updateMaxPrice(event)} />
            </label>

          </div>
        

          <div className="form-calendar">

             
            <div className="pick-your-date">Pick your dates:</div>
            <br/>
            <div className="weekDays-selector">
  <input type="checkbox" id="weekday-mon" className="weekday" />
  <label onClick={() => this.selectWeekDay(1)} htmlFor="weekday-mon">M</label>
  <input type="checkbox" id="weekday-tue" className="weekday" />
  <label onClick={() => this.selectWeekDay(2)} htmlFor="weekday-tue">T</label>
  <input type="checkbox" id="weekday-wed" className="weekday" />
  <label onClick={() => this.selectWeekDay(3)} htmlFor="weekday-wed">W</label>
  <input type="checkbox" id="weekday-thu" className="weekday" />
  <label onClick={() => this.selectWeekDay(4)} htmlFor="weekday-thu">T</label>
  <input type="checkbox" id="weekday-fri" className="weekday" />
  <label onClick={() => this.selectWeekDay(5)} htmlFor="weekday-fri">F</label>
  <input type="checkbox" id="weekday-sat" className="weekday" />
  <label onClick={() => this.selectWeekDay(6)} htmlFor="weekday-sat">S</label>
  <input type="checkbox" id="weekday-sun" className="weekday" />
  <label onClick={() => this.selectWeekDay(0)} htmlFor="weekday-sun">S</label>
          </div>   
            <DayPicker
              selectedDays={this.state.selectedDays}
              
              onDayClick={this.handleDayClick}
              month= {this.state.startDate ? new Date(this.state.startDate) : new Date()}
              fromMonth= {new Date(this.state.startDate)}
              toMonth= {new Date(this.state.endDate)}
              />

          </div>
          </div>


        <button>Search</button>
        </form>

        </div>
      </section>

    );
  }
}
 

export default Search;