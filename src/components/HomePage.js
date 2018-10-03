import React from "react";
import { Link } from "react-router-dom";
import Search from './Search'

function HomePage(props) {
  const { currentUser } = props;
  return (
    <section className="big-header">
    <div className="header-text">
      <h2>Pairs In Paris</h2>
   
      <p>A collaborative platform for people who needs to be in Paris few days per week on a regular basis.</p>
      <Link className="search-homepage" to="/search"><button type="button" class="btn btn-primary">Start Your Search 🔍</button></Link>

      </div>
    </section>
  );
}

export default HomePage;