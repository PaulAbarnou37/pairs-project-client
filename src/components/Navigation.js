import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bulma/css/bulma.css'



function Navigation(props) {
  const { currentUser } = props;
  return (
    <nav className="navbar navbar-expand-md sticky-top">
    <ul className="navbar-nav">
    
    <NavLink className="navbar-brand each-link" to="/"><img src="../../images/Logo-Pairs.png" alt=""/></NavLink>
      <div className="link-nav">
      <li className="nav-item each-link"><NavLink className="navlink" exact to="/search">Search</NavLink></li>

      {currentUser && (
      <div className="btn-group">
        <button type="button" className="btn btn-success dropdown-toggle btn-green" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Hi, {currentUser.firstName} 🖖
        </button>
        <div className="dropdown-menu">
          <a className="dropdown-item" href="#">Edit my profile</a>
          <NavLink className="dropdown-item" to="/mysearches">My searches</NavLink>
          <div className="dropdown-divider"></div>
          <a onClick={() => props.onClick()} className="dropdown-item" href="#">Log Out</a>
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
