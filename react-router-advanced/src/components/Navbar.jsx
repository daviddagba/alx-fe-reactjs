import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/about">About</Link> |{" "}
      <Link to="/profile">Profile</Link> |{" "}
      <Link to="/posts/5">Dynamic Post (ID 5)</Link>
    </nav>
  );
}
