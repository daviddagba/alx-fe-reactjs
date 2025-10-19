import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the advanced React Router demo!</p>
      <Link to="/about">Go to About</Link>
    </div>
  );
}
