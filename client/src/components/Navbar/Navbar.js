import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

//  TODO:Need CSS rules for nav-link and active

export default function Navbar(props) {

  const location = useLocation();
  
  return (
    <>
      <div className="navbar">
        <Link
          to="/"
          className={location.pathname === "/" ? "nav-link active" : "nav-link"}
        >
          <h1>Tech-Blog</h1>
        </Link>
        <div className="navbar-links">
          <Link
            to="dashboard"
            className={
              location.pathname === "/dashboard" ? "nav-link active" : "nav-link"
            }
            aria-current="page"
          >
            <h3>Dashboard</h3>
          </Link>
          <h3>Login</h3>
        </div>
      </div>
    </>
  );
}
