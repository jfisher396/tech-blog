import React from "react";

function LoginForm(props) {
  return (
    <form id="login-form" className="field" onSubmit={props.loginButton}>
      <div className="control has-icons-left has-icons-right">
        <input
          onChange={props.handleInputChange}
          value={props.loginData.username}
          type="text"
          name="username"
          className="input is-success"
          placeholder="Username"
          aria-label="user's username"
        />
        <span className="icon is-small is-left">
          <i className="fas fa-user"></i>
        </span>
        <span className="icon is-small is-right">
          <i className="fas fa-check"></i>
        </span>
      </div>
      <div className="control has-icons-left has-icons-right">
        <input
          onChange={props.handleInputChange}
          value={props.loginData.password}
          type="password"
          name="password"
          className="input is-success"
          placeholder="Password"
          aria-label="user's password"
        />
        <span className="icon is-small is-left">
          <i className="fas fa-key"></i>
        </span>
        <span className="icon is-small is-right">
          <i className="fas fa-check"></i>
        </span>
        <button type="submit" className="button is-primary">
        Login
        </button>
      </div>
      
    </form>
  );
}

export default LoginForm;
