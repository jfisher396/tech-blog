import React from "react";
import "./Navbar.css"

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <h1><a href="#">Tech-Blog</a></h1>
        <div className="navbar-links">
          <h3><a href="#">Dashboard</a></h3>
          <h3><a href="#">Login</a></h3>
        </div>
      </div>
    </>
  );
}
