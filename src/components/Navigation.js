import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from 'react-bootstrap';




function Navigation(props) {
  const { currentUser } = props;
  return (
    <nav className="navbar navbar-expand-md sticky-top">
    <ul className="navbar-nav">
    
      <a className="each-link" href=""><NavLink className="navbar-brand" to="/"><img src="../../images/Logo-Pairs.png" alt=""/></NavLink></a>
      <div className="link-nav">
      <li className="nav-item each-link"><NavLink className="navlink" exact to="/search">Search</NavLink></li>
      
      {currentUser && (
        <div>
          <b>{currentUser.email}</b>
          <button onClick={() => props.onClick()}>
            Log Out
          </button>
        </div>
      )}

      {!currentUser && (
        <div>
        <li className="nav-item each-link"><NavLink className="navlink" to="/login">Log In</NavLink></li>
        <li className="nav-item each-link"><NavLink className="navlink" to="/signup">SIGN UP</NavLink></li>
        </div>
      )}
      </div>
      </ul>
    </nav>
  );
}

export default Navigation;
