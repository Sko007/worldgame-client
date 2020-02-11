import React from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { login } from "../actions/Login";
import LobbyHallContainer from "./LobbyHallContainer";
import {Redirect} from "react-router-dom"
import { Button, Form } from "semantic-ui-react";



class LoginFormContainer extends React.Component {
  state = { email: "", password: "" };


  onSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    const action = login(email, password);
    this.props.dispatch(action);
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const checkToken = this.props.jwt;


    if (!checkToken) {
      return (
        <LoginForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          values={this.state}
        />
      );
    } else {
      return <Redirect to={"/gameroom"}></Redirect>
    }
  }
}

const mapStateToProps = reduxState => {

  return {
    jwt: reduxState.user.jwt,

  };
};

export default connect(mapStateToProps)(LoginFormContainer);

