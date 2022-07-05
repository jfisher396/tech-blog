import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import "./Navbar.css";

export default function Navbar(props) {
  let navigate = useNavigate();

  return (
    <>
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        {/* renders site name and sets navigation to homepage */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" href="#">
            The Latest...
          </Link>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        {/* navigation to home and dashboard pages */}
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            {props.currentUser && (
              <Link to="/dashboard" className="navbar-item">
                Dashboard
              </Link>
            )}
          </div>

          {/* login form and login/logout buttons */}
          <div className="navbar-end">
            {/* if a user is logged in it shows there user name in navbar and renders logout button */}
            {props.currentUser ? (
              <>
                <span id="logged-in-as-span">
                  Logged in as {props.currentUser.username}
                </span>{" "}
                <button className="button is-success" onClick={props.logout}>
                  Logout
                </button>
              </>
            ) : (
              // if no user is logged in a login form is rendered along with an option to register if not already a registerd user
              <div>
                <LoginForm
                  loginData={props.loginFormData}
                  handleInputChange={props.inputChange}
                  loginButton={props.loginSubmit}
                />
                <div className="register-link">
                  <p id="register-link-label">Not a registered user?</p>
                  <Link to="/register">
                    <button className="button is-success">Register</button>
                  </Link>
                </div>
                {props.currentUser ? (
                  <button className="button is-success" onClick={props.logout}>
                    Logout
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
