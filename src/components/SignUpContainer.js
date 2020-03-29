import React, { Component } from "react";
import { connect } from "react-redux";
import { SignUp } from "../actions/SignUp";
import { Link } from "react-router-dom";
import LoginContainer from "./LoginFormContainer";
import SignUpForm from "./SignUpForm";
import Header from "./Items/Menue";
import "./Css/Signup.css";

class SignUpContainer extends Component {
  state = {
    email: "",
    password: "",
    username: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { email, password, username } = this.state;
    const action = SignUp(email, password, username);
    this.props.dispatch(action);
    this.setState({ email: "",
     password: "", 
     username: "" });
  };
  render() {
    return (
      <div className="outer-wrapper">
        <Header />
        <h1 style={{ color: "white" }}>
          The great Worldgame, play in Multiplayer or Singleplayer mode
        </h1>
        <h2 style={{ color: "white" }}>
          You dont have an Account yet? Sign up!
        </h2>
        <div className="container">
          <SignUpForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            email={this.state.email}
            password={this.state.password}
            username={this.state.username}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  console.log("check the auth in reduxState", reduxState.auth)
  return {
    auth: reduxState.auth.auth
  };
};

export default connect(mapStateToProps)(SignUpContainer);
