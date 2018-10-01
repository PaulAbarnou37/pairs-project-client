import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h2>404 Not Found</h2>

      <p>Sorry, you're breaking up. We are hanging up the phone now.</p>

      <p>Here's a gorilla for you to talk to though:</p>
      <h1>🦍</h1>

      <Link to="/phone-list">Buy Your Next Phone</Link>
    </section>
  );
}

export default NotFound;
