import React, { Component } from "react";
import { connect } from "react-redux";
import superagent from "superagent";
import LobbyHall from "./LobbyHall";

class LobbyHallContainer extends Component {
  url = "http://localhost:4000";

  state = {
    text: ""
  };

  onSubmit = async event => {
    event.preventDefault();
    const jwt = this.props.jwt;

    try {
      const response = await superagent
        .post(`${this.url}/gameroom`)
        .set("Authorization", `Bearer ${jwt}`)
        .send({ name: this.state.text });

      console.log("response after create room", response);
    } catch (error) {
      console.warn("error test", error);
    }
    this.setState({ text: "" });
  };
  onChange = event => {
    const { value } = event.target;
    this.setState({ text: value });
  };

  render() {
    console.log("see if LobbyContainer rerenders");

    return (
      <div>
        <h1>Lobby</h1>

        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} value={this.state.text} />

          <button>Create A Room</button>
        </form>

        <LobbyHall events={this.props.events} id={this.props.id}/>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  console.log("lobbycontainer retrieve from store", reduxState.events);
  return {
    jwt: reduxState.user.jwt,
    events: reduxState.events
  };
};

export default connect(mapStateToProps)(LobbyHallContainer);
