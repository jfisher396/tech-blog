import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(props) {
  const location = useLocation();
  return (
    <>
      <div className="navbar">
        <Link to="/"><h1>Tech-Blog</h1></Link>
        <div className="navbar-links">
          <Link to="dashboard"><h3>Dashboard</h3></Link>
          <h3>Login</h3>
        </div>
      </div>
    </>
  );
}
