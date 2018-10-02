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


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
    };
    this.state = { 
      owner: "",
      city: "",
      startDate: "",
      endDate: "",
      selectedDays: [],
      maxPrice: "",
      isSubmitSuccess: false,
      searchId: "",
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
      <h1>Make your search here! 🤓</h1>
      <div className="box">
        <form onSubmit={event => this.handleSubmit(event)}>
        <div className='row'>
        <div>
            <label className="input-form">
            City
            <input value={city} type="text" placeholder=" 🏢 e.g. Paris"
                onChange={event => this.updateCity(event)} />
            </label>
            <label className="input-form">
            Your max. monthly rent in $
              <input  value={maxPrice} type="number" placeholder=" 💵 500$"
                  onChange={event => this.updateMaxPrice(event)} />
            </label>
        
        
          <div>
            Your date range:
            <br/>
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
          


          <div>
          <label>
            Pick your dates:
            <br/>

            <DayPicker
              selectedDays={this.state.selectedDays}
              onDayClick={this.handleDayClick}
              month= {new Date(2018,5,1)}
              // fromMonth= {new Date(this.state.startDate)}
              // toMonth= {new Date(this.state.endDate)}
              />
          </label>
          </div>
          </div>


        </form>
        <button>Search</button>

        </div>
      </section>

    );
  }
}
 

export default Search;