import React from "react";
import { Link } from "react-router-dom";
import Search from './Search'

function HomePage(props) {
  const { currentUser } = props;
  return (
    <section className="big-header">
    <div className="header-text">
      <h2>Find someone who is here when you’re not  </h2>
   
      <p>Pairs lets you find someone to share your room with during the time you’re </p>
      <button type="button" class="btn btn-primary"><Link className="search-homepage" to="/search">Start Your Search 🔍</Link></button>

      </div>
      {/* <img src="../../images/pairs-background.png" alt=""/> */}
    </section>
  );
}

export default HomePage;