import React from "react";
import WeekdayPicker from "react-weekday-picker";
 
class MyComponent extends React.Component {
 
  render() {
    var modifiers = {
      'weekend': function(weekday) {
        return weekday == 0 || weekday == 6;
      }
    };
  
    return <WeekdayPicker modifiers={modifiers} />
  }
}

export default MyComponent;