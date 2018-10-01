import React from "react";
import { Link } from "react-router-dom";

function HomePage(props) {
  const { currentUser } = props;
  return (
    <section className="big-header">
      <h2>Find someone who is here when you’re not  </h2>
      {currentUser && (
        <p>Hi, {currentUser.firstName}.</p>
      )}
      <p>Pairs lets you find someone to share your room with during the time you’re </p>
    </section>
  );
}

export default HomePage;