import React, { Component } from "react";
import { connect } from "react-redux";
import { SignUp } from "../actions/SignUp";
import { Link } from "react-router-dom";
import LoginContainer from "./LoginFormContainer";
import SignUpForm from "./SignUpForm"
import Header from "./Items/Menue"
import "./Css/Signup.css"

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
      return ;
    }



    return (

      <div className="outer-wrapper">

      <Header />
      <h1 style={{color:"white"}}>The great Worldgame</h1>

      <h2 style={{color:"white"}}>You dont have an Account yet? Sign up!</h2>


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
  console.log("value in signup", reduxState.auth.auth);
  return {
    auth: reduxState.auth.auth
  };
};

export default connect(mapStateToProps)(SignUpContainer);
