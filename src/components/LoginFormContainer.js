import React from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { login } from "../actions/Login";
import LobbyHallContainer from "./LobbyHallContainer";

class LoginFormContainer extends React.Component {
  state = { email: "", password: "" };

  onSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    const action = login(email, password);
    this.props.dispatch(action);
  };
x
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const checkToken = this.props.jwt;
    console.log("see if Loginformcontainer rerenders")


    // console.log("test token in render method", checkToken);

    if (!checkToken) {
      return (
        <LoginForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          values={this.state}
        />
      );
    } else {
      return <LobbyHallContainer 
        events={this.props.events}/>;
    }
  }
}

const mapStateToProps = reduxState => {

  return {
    jwt: reduxState.user.jwt,

  };
};

export default connect(mapStateToProps)(LoginFormContainer);

