import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bulma/css/bulma.css'



function Navigation(props) {
  const { currentUser } = props;
  return (
    <nav className="navbar navbar-expand-md sticky-top">
    <ul className="navbar-nav">
    
      <a className="each-link" href=""><NavLink className="navbar-brand" to="/"><img src="../../images/Logo-Pairs.png" alt=""/></NavLink></a>
      <div className="link-nav">
      <li className="nav-item each-link"><NavLink className="navlink" exact to="/search">Search</NavLink></li>

      {currentUser && (
      <div class="btn-group">
        <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Hi, {currentUser.firstName} 🖖
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Edit my profile</a>
          <a class="dropdown-item" href="#"><NavLink to="/mysearches">My searches</NavLink></a>
          <div class="dropdown-divider"></div>
          <a onClick={() => props.onClick()} class="dropdown-item" href="#">Log Out</a>
        </div>
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
