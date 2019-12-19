import React, { Component } from "react";
import { connect } from "react-redux";
import { SignUp } from "../actions/SignUp";
import { Link } from "react-router-dom";
import LoginContainer from "./LoginFormContainer";

class SignUpContainer extends Component {
  state = {
    email: "",
    password: "",
    username: ""
  };

  handleChange = event => {
    console.log("event.target.value", event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    // alert("Your account has been created!", this.state.value);
    const { email, password, username } = this.state;

    const action = SignUp(email, password, username);

    this.props.dispatch(action);
  };
  render() {
    console.log("see if the SignupContainer rerenders");

    if (this.props.auth !== null) {
      return <LoginContainer />;
    }

    return (
      <div>
        <h1>Sign Up:</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Userame:</label>
            <input
              name="username"
              type="text"
              placeholder="Put your Username here"
              value={this.state.user}
              onChange={this.handleChange}
            />
            <br />
            <label>Emailadr:</label>
            <input
              name="email"
              type="text"
              placeholder="Put your email here"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <br />
            <label>Password:</label>
            <input
              name="password"
              type="password"
              placeholder="Put your password here"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br />
            <button type="submit">Sign up</button>
          </form>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  console.log("value in signup", reduxState.auth.auth);
  return {
    auth: reduxState.auth.auth
  };
};

export default connect(mapStateToProps)(SignUpContainer);
