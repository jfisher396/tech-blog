import React from "react";

function LoginForm(props) {
  return (
    <div id="login-form" className="field" onSubmit={props.loginButton}>
      <div className="control has-icons-left has-icons-right">
        <input
          onChange={props.handleInputChange}
          value={props.loginData.email}
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
      <input
        onChange={props.handleInputChange}
        value={props.loginData.password}
        type="password"
        name="password"
        className="input"
        placeholder="Password"
        aria-label="user's password"
      />
      <button type="submit"  className="button is-primary">
        Login
      </button>
    </div>
  );
}

export default LoginForm