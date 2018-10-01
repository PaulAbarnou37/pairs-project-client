import React from "react";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import api from '../api';
import { Redirect } from "react-router-dom";


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      owner: "",
      city: "Paris",
      startDate: "",
      endDate: "",
      selectedDays: [],
      maxPrice: "600",
      isSubmitSuccess: false,
      searchId: "",
     };
     this.handleDayClick = this.handleDayClick.bind(this);  
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
    const {isSubmitSuccess, owner, city, startDate, endDate, selectedDays, maxPrice, searchId} = this.state;
  
    if (isSubmitSuccess) {
      // redirect back to the phone details page if the submission worked!
      // const { params } = this.props.match; => extraire url page actuelle
      return <Redirect to={`/search/${searchId}`} />
    }

    
    return (  
    
      <section>
        <h2>Search</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            City:
            <input value={city} type="text" placeholder="Paris"
                onChange={event => this.updateCity(event)} />
          </label>
          <br/>
          <label>
            Maximum Price/Month:
            <input value={maxPrice} type="number" placeholder="Type your maximum price"
                onChange={event => this.updateMaxPrice(event)} />
          </label>
          <br/>
          <label>
            From:
            <input value={startDate} type="date" placeholder=""
                onChange={event => this.updateStartDate(event)} />
          </label>
          <br/>
          <label>
            To:
            <input value={endDate} type="date" placeholder=""
                onChange={event => this.updateEndDate(event)} />
          </label>
          <br/>
          <label>
            Pick your dates:
            <br/>
            <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
        />
          </label>
          <br/>
          <button>Search</button>
        </form>
      </section>

    );
  }
}
 

export default Search;