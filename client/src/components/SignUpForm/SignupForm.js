import React from "react";

function SignupForm(props) {
  return (
    <form className="field" onSubmit={props.handleSubmit}>
      <div className="control">
        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          onChange={props.handleInputChange}
          value={props.newUserUsername}
          type="text"
          name="username"
          className="input"
        />
        
      </div>
      <div className="control">
        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          onChange={props.handleInputChange}
          value={props.newUserEmail}
          type="email"
          name="email"
          className="input"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="control">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          onChange={props.handleInputChange}
          value={props.newUserPassword}
          type="password"
          name="password"
          className="input"
        />
      </div>
      <button type="submit" className="button is-success">
        Submit
      </button>
    </form>
  );
}

export default SignupForm;
