import React, { Component } from "react";
import { connect } from "react-redux";
import { SignUp } from "../actions/SignUp";
import { Link } from "react-router-dom";


class SignUpContainer extends Component {
  state = {
    email: "",
    password: "",
    username: ""

  };

  handleChange = event => {
      console.log("event.target.value", event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    // alert("Your account has been created!", this.state.value);
    const { email, password, username } = this.state;

    console.log("test the username", username)

    const action = SignUp(email, password, username);

    console.log("username after action", username, email)

    this.props.dispatch(action);
  };
  render() {
    if (this.props.jwt === null) {
      return (
        <div>
          <br />
          <br />
          <h1>SAWRRRYYYY YOU ARE ALREADY LOGGED IN!!</h1>
        </div>
      );
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
            <Link to="/login"><button>Login</button></Link>
          </form>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = reduxState => {

//   return {
//     // jwt: reduxState.signUp.jwt
//   };
// };

export default connect()(SignUpContainer);