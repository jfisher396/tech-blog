import React from "react";

function SignupForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          onChange={props.handleInputChange}
          value={props.newUserEmail}
          type="email"
          name="email"
          className="form-control"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          onChange={props.handleInputChange}
          value={props.newUserPassword}
          type="password"
          name="password"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default SignupForm;
