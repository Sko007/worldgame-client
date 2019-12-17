import React from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { login } from "../actions/Login";
import LobbyHall from "./LobbyHall";

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
      return <LobbyHall />;
    }
  }
}

const mapStateToProps = reduxState => {
  return {
    jwt: reduxState.user
  };
};

export default connect(mapStateToProps)(LoginFormContainer);

