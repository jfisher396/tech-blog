import React from "react";
import { Link, useLocation } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import "./Navbar.css";

//  TODO:Need CSS rules for nav-link and active

export default function Navbar(props) {
  const location = useLocation();

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" href="#">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
              alt="logo"
            />
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

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>

            <Link to="/dashboard" className="navbar-item">
              Dashboard
            </Link>
          </div>

          <div className="navbar-end">
            {props.currentUser ? (
              <>
                <span>Logged in as {props.currentUser.username}</span>{" "}
                <button className="button is-primary" onClick={props.logout}>
                  Logout
                </button>
              </>
            ) : (
              <div>
                <LoginForm
                  loginData={props.loginFormData}
                  handleInputChange={props.inputChange}
                  loginButton={props.loginSubmit}
                />
                <div className="register-link">
                  <p id="register-link-label">Not a registered user?</p>
                  <Link to="/register"><button className="button is-success">Register</button></Link>
                </div>
                {props.currentUser ? (
                  <button className="button is-primary" onClick={props.logout}>Logout</button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
